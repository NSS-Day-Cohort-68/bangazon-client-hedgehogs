import { useEffect } from "react"
import Table from "../table"
import { getOrders } from "../../data/orders"

export default function CartDetail({ cart, removeProduct }) {
  const headers = ['Product', 'Price', '']
  const footers = ['Total', cart.total, '']

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Table headers={headers} footers={footers}>
      {
        cart.products?.map(product => {
          return (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <span className="icon is-clickable" onClick={() => removeProduct(product.id)}>
                  <i className="fas fa-trash"></i>
                </span>
              </td>
            </tr>
          )
        })
      }
    </Table>
  )
}
