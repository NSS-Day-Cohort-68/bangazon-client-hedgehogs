import { useRef } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"

export default function AddPaymentModal({ showModal, setShowModal, addNewPayment }) {
  const merchantNameInput = useRef()
  const acctNumInput = useRef()
  const expDate = useRef()

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title="Add New Payment Method">
      <>
        <Input
          id="merchantName"
          type="text"
          label="Merchant Name"
          refEl={merchantNameInput}
        />
        <Input
          id="accNum"
          type="text"
          label="Account Number"
          refEl={acctNumInput}
        />
        <Input 
          id="paymentDate"
          type="date"
          label="Expiration Date"
          refEl={expDate}
        />
      </>
      <>
        <button
          className="button is-success"
          onClick={() => {
            const rawDate = new Date(expDate.current.value);
            const formattedDate = `${rawDate.getFullYear()}-${(rawDate.getMonth() + 1).toString().padStart(2, '0')}-${rawDate.getDate().toString().padStart(2, '0')}`;
            addNewPayment({
            account_number: acctNumInput.current.value,
            merchant_name: merchantNameInput.current.value,
            expiration_date: formattedDate
          })}}
        >Add Payment Method</button>
        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
      </>
    </Modal>
  )
}
