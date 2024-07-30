import { useState } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"

export default function AddPaymentModal({ showModal, setShowModal, materialPriceReply, currentMoney }) {
    //note: needs to have different title and name for cost/profit.
  const [materialQuantity, setMaterialQuanity] = useState(0)
  const [cost, setCost] = useState(0)

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title='How much ${} to purchase?'>
      <>
        <Input
          type="number"
          label="Amount"
          value={materialQuantity}
          onChange={(e) => setMaterialQuanity(e.target.value)}
        />
      </>
      <p>Current Money: {currentMoney}</p>
      <p>Cost</p>
      <>
        <button
          className="button is-success"
          onClick={handleAddPayment}
        >Confirm</button>
        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
      </>
    </Modal>
    //need to create PUT/POST request and cap the user from exceeding current money
  )
}