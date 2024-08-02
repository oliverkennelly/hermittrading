import { useEffect, useState } from "react"
import { createPlayerInventoryItem, updatePlayerInventoryById } from "../services/playerInventoryService"
import { Input } from "./form-elements/input"
import { playerPurchase } from "../services/playerStatService"
import { Modal, Button } from 'react-bootstrap'

export default function BuyModal ({ authToken, showModal, setShowModal, playerStatus, materialPriceInfo, playerInventoryItem, fetchPlayerInventory}) {
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
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>How much {materialPriceInfo?.material_name} to buy?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleTransaction}>
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
)
}