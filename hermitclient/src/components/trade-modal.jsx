import { useEffect, useState } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"

export default function TradeModal ({ showModal, setShowModal, materialPriceReply, currentMoney }) {
    //note: needs to have different title and name for cost/profit.
  const [materialQuantity, setMaterialQuanity] = useState(0)
  const [cost, setCost] = useState(0)
  let maxQuanity = Math.floor(currentMoney / materialPriceReply.max_price)
  let titleMessage = `How much ${materialPriceReply.material} to ${buying ? "purchase" : "sell"}?`

  const handleTransaction = () => {

  }

  useEffect(() => {
    setCost(materialQuantity*materialPriceReply.max_price)
  }, [materialQuantity])

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title={titleMessage}>
      <>
        <Input
          type="number"
          label="Amount"
          value={materialQuantity}
          min="1"
          max={maxQuanity}
          onChange={(e) => setMaterialQuanity(e.target.value)}
        />
      </>
      <p>Current Money: {currentMoney} gold</p>
      <p>Cost: {cost} gold</p>
      <>
        <button
          className="button is-success"
          onClick={handleTransaction}
        >Confirm</button>
        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
      </>
    </Modal>
    //need to create PUT/POST request
  )
}