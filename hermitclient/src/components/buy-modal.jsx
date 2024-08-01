import { useEffect, useState } from "react"
import { createPlayerInventoryItem, updatePlayerInventoryById } from "../services/playerInventoryService"
import { Input } from "./form-elements/input"
import { playerPurchase } from "../services/playerStatService"

export default function BuyModal ({ authToken, setShowModal, playerStatus, materialPriceInfo, playerInventoryItem, fetchPlayerInventory}) {
  const [materialQuantity, setMaterialQuantity] = useState(0)
  const [cost, setCost] = useState(0)
  const [updatedInv, setUpdatedInv] = useState({})

  let maxQuantity = Math.floor(playerStatus.money / materialPriceInfo?.max_price)

  const handleTransaction = () => {
    if (playerInventoryItem === undefined) {
        createPlayerInventoryItem(authToken, updatedInv)
    } else {
        updatePlayerInventoryById(authToken, updatedInv.material_id, updatedInv)
    }
    playerPurchase(authToken, playerStatus, cost)
    setShowModal(false)
    fetchPlayerInventory()
  }

  const handleQuantityChange = (e) => {
    const newQuantity = Math.min(Math.max(1, parseInt(e.target.value) || 0), maxQuantity)
    setMaterialQuantity(newQuantity)
  }

  useEffect(() => {
    setCost(materialQuantity*materialPriceInfo?.max_price)
    setUpdatedInv({
        "material_id": materialPriceInfo?.material,
        "quantity": materialQuantity + (playerInventoryItem ? playerInventoryItem?.quantity : 0)
    })
  }, [materialQuantity, materialPriceInfo])

  return (
    <div>
        <h2>How much {materialPriceInfo?.material_name} to buy?</h2>
        <Input
          type="number"
          label="Amount"
          value={materialQuantity}
          min="1"
          max={maxQuantity}
          onChange={handleQuantityChange}
        />
      <p>Current Money: {playerStatus.money} gold</p>
      <p>Cost: {cost} gold</p>
        <button
          className="button is-success"
          onClick={handleTransaction}
        >Confirm</button>
        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
  </div>)
}