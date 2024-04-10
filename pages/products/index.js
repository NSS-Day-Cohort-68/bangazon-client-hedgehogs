import { useEffect, useState } from 'react'
import Filter from '../../components/filter'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getProducts } from '../../data/products'


export async function getServerSideProps() {
  const res = await fetch("http://localhost:8000/products")
  const data = await res.json()
  if (data) {

      const locationData = [...new Set(data.map(product => product.location))]
      const locationObjects = locationData.map(location => ({
        id: location,
        name: location
      }))
      return {
        props: {
          products: data,
          locations: locationObjects
        }
      }
  }
}

export default function Products({ products, locations }) {
  const [xproducts, setXproducts] = useState([])
  // const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  // const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  // const [locations, setLocations] = useState([])

  // useEffect(() => {
  //   getProducts().then(data => {
  //     if (data) {

  //       const locationData = [...new Set(data.map(product => product.location))]
  //       const locationObjects = locationData.map(location => ({
  //         id: location,
  //         name: location
  //       }))

  //       setProducts(data)
  //       setIsLoading(false)
  //       setLocations(locationObjects)
  //     }
  //   })
  //   .catch(err => {
  //     setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
  //   })
  // }, [])


  const searchProducts = (event) => {
    getProducts(event).then(productsData => {
      if (productsData) {
        setXproducts(productsData)
      }
    })
  }

  useEffect(()=>{
    setXproducts(products)
  },[])

  // if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <Filter productCount={xproducts.length} onSearch={searchProducts} locations={locations} />

      {xproducts != [] ? 
          <div className="columns is-multiline">
          {xproducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        :
        <div className="columns is-multiline">
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      }
    </>
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
