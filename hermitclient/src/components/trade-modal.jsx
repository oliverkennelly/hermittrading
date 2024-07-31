import { useEffect, useState } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"
import { updatePlayerInventoryById } from "../services/playerInventoryService"

export default function TradeModal ({ authToken, showModal, setShowModal, materialPriceReply, currentMoney, buying}) {
  const [materialQuantity, setMaterialQuanity] = useState(0)
  const [cost, setCost] = useState(0)
  const [updatedInv, setUpdatedInv] = useState({})
  let maxQuanity = Math.floor(currentMoney / materialPriceReply.max_price)
  let titleMessage = `How much ${materialPriceReply.material_name} to ${buying ? "purchase" : "sell"}?`

  const handleTransaction = () => {
    updatePlayerInventoryById(authToken, /* put the id of the inventory item here*/ updatedInv)
    setShowModal(false)
  }

  useEffect(() => {
    setCost(materialQuantity*materialPriceReply.max_price)
    setUpdatedInv({
        "material_id": materialPriceReply.material,
        "quantity": materialQuantity
    })
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
      <p>{buying ? "Cost" : "Profit"}: {cost} gold</p>
      <>
        <button
          className="button is-success"
          onClick={handleTransaction}
        >Confirm</button>
        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
      </>
    </Modal>
  )
}