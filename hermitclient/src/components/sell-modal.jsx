import { useEffect, useState } from "react"
import { deletePlayerInventoryItemById, updatePlayerInventoryById } from "../services/playerInventoryService"
import { Input } from "./form-elements/input"

export default function SellModal ({ authToken, showModal, setShowModal, currentMoney, materialPriceInfo, playerInventoryItem}) {
  const [materialQuantity, setMaterialQuantity] = useState(0)
  const [cost, setCost] = useState(0)
  const [updatedInv, setUpdatedInv] = useState({})

  const handleQuantityChange = (e) => {
    const newQuantity = Math.min(Math.max(1, parseInt(e.target.value) || 0), playerInventoryItem?.quantity || 0)
    setMaterialQuantity(newQuantity)
  }

  const handleTransaction = () => {
    if (playerInventoryItem?.quantity === materialQuantity) {
        deletePlayerInventoryItemById(playerInventoryItem?.id)
    } else {
        updatePlayerInventoryById(authToken, updatedInv.material_id, updatedInv)
    }
    setShowModal(false)
  }

  useEffect(() => {
    setCost(materialQuantity*materialPriceInfo?.max_price)
    setUpdatedInv({
        "material_id": materialPriceInfo?.material,
        "quantity": playerInventoryItem?.quantity - materialQuantity
    })
  }, [materialQuantity])

  return (<div>
    <h2>How much {materialPriceInfo?.material_name} to sell?</h2>
        <Input
          type="number"
          label="Amount"
          value={materialQuantity}
          min="1"
          max={playerInventoryItem?.quantity}
          onChange={handleQuantityChange}
        />
      <p>Current Money: {currentMoney} gold</p>
      <p>Profit: {cost} gold</p>
        <button
          onClick={handleTransaction}
        >Confirm</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    )
}