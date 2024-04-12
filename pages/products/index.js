import { useEffect, useState } from 'react'
import Filter from '../../components/filter'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getCategories, getProducts } from '../../data/products'
import RecentProducts from '../../components/product/recentProductList'



export default function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState([])
  const [filtered, setFiltered] = useState(false)

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })

    getProducts().then(data => {
      if (data) {

        const locationData = [...new Set(data.map(product => product.location))]
        const locationObjects = locationData.map(location => ({
          id: location,
          name: location
        }))

        setProducts(data)
        setIsLoading(false)
        setLocations(locationObjects)
      }
    })
    .catch(err => {
      setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
    })
  }, [])

  const searchProducts = (event) => {
    getProducts(event).then(productsData => {
      if (productsData) {
        setProducts(productsData)
      }
    })
    setFiltered(true)
  }

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <Filter productCount={products.length} onSearch={searchProducts} locations={locations} filterView={setFiltered}/>
      {filtered == false ? 
            <div className="columns">
            {categories?.map(category => (
              <div className="column" key={category.id}>
                <h3 className="title is-3">{category.name}</h3>
                <RecentProducts categoryId={category.id} key={category.id} />
              </div>
            ))}
          </div>
        :
        <>
          <h3 className="title is-3">Products matching filters:</h3>
          <div className="columns is-multiline">
            {products.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
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
