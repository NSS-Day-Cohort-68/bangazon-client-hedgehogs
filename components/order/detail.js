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
        cart.lineitems?.map(lineitem => {
          return (
            <tr key={lineitem.product.id}>
              <td>{lineitem.product.name}</td>
              <td>{lineitem.product.price}</td>
              <td>
<<<<<<< HEAD
                <span className="icon is-clickable" onClick={() => removeProduct(lineitem.id)}>
=======
                <span className="icon is-clickable" onClick={() => removeProduct(lineitem.product.id)}>
>>>>>>> 631d212ef80886a0e9b76649d5886249d2685229
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
