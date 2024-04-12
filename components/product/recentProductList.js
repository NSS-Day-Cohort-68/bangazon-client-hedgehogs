import { useEffect, useState } from "react"
import { ProductCard } from "./card"
import { getProducts } from "../../data/products"

export default function RecentProducts({ categoryId }) {
    const [recentProducts, setRecentProducts] = useState([])
    const query = `category=${categoryId}&recent=true`

    useEffect(() => {
        getProducts(query).then(data => {
            if(data) {
            setRecentProducts(data)
        }})
    }, [])


    if (recentProducts.length === 0) {
        return (
            <div className="ml-4">No products available</div>
        )
    } else {
        return recentProducts.map(product => (
            <ProductCard product={product} key={product.id}/>
            ))
    }
}       