import { useEffect, useState } from "react"
import { updatePlayerInventoryById } from "../services/playerInventoryService"
import { getShopMaterialPriceById } from "../services/shopService"
import { Input } from "./form-elements/input"
import Modal from "./modal"

export default function TradeModal ({ authToken, showModal, setShowModal, currentMoney, buying, materialPriceId}) {
  const [materialQuantity, setMaterialQuanity] = useState(0)
  const [cost, setCost] = useState(0)
  const [updatedInv, setUpdatedInv] = useState({})
  const [materialPriceReply, setMaterialPriceReply] = useState({})
  let maxQuanity = materialPriceReply ? Math.floor(currentMoney / materialPriceReply.max_price) : 0
  let titleMessage = `How much ${materialPriceReply.material_name} to ${buying ? "purchase" : "sell"}?`

  const fetchMaterialPrice = () => {
    getShopMaterialPriceById(materialPriceId, authToken).then(data => {
        setMaterialPriceReply(data)
    })
  }
  const handleTransaction = () => {
    updatePlayerInventoryById(authToken, updatedInv.material_id, updatedInv)
    setShowModal(false)
  }

  useEffect(() => {
    setCost(materialQuantity*materialPriceReply.max_price)
    setUpdatedInv({
        "material_id": materialPriceReply.material,
        "quantity": materialQuantity
    })
  }, [materialQuantity])

  useEffect(() => {
    fetchMaterialPrice()
  }, [materialPriceId])

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