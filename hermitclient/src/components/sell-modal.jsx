import { useEffect, useState } from "react"
import { deletePlayerInventoryItemById, updatePlayerInventoryById } from "../services/playerInventoryService"
import { Input } from "./form-elements/input"
import { playerSell } from "../services/playerStatService"
import { Modal, Button } from 'react-bootstrap'

export default function SellModal ({ authToken, showModal, setShowModal, playerStatus, materialPriceInfo, playerInventoryItem, fetchPlayerInventory}) {
  const [materialQuantity, setMaterialQuantity] = useState(1)
  const [cost, setCost] = useState(0)
  const [updatedInv, setUpdatedInv] = useState({})

  const handleQuantityChange = (e) => {
    const newQuantity = Math.min(Math.max(1, parseInt(e.target.value) || 1), playerInventoryItem?.quantity || 1)
    setMaterialQuantity(newQuantity)
  }

  const handleTransaction = () => {
    if (playerInventoryItem?.quantity === materialQuantity) {
        deletePlayerInventoryItemById(authToken, playerInventoryItem?.id)
    } else {
        updatePlayerInventoryById(authToken, playerInventoryItem?.id, updatedInv)
    }
    playerSell(authToken, playerStatus, cost)
    setShowModal(false)
    fetchPlayerInventory()
  }

  useEffect(() => {
    setCost(materialQuantity*materialPriceInfo?.max_price)
    setUpdatedInv({
        "material_id": materialPriceInfo?.material,
        "quantity": playerInventoryItem?.quantity - materialQuantity
    })
  }, [materialQuantity, materialPriceInfo, playerInventoryItem])

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>How much {materialPriceInfo?.material_name} to sell?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Input
          type="number"
          label="Amount"
          value={materialQuantity}
          min="1"
          max={playerInventoryItem?.quantity || 1}
          onChange={handleQuantityChange}
        />
      <p>Current Money: {playerStatus.money} gold</p>
      <p>Profit: {isNaN(cost) ? 0 : cost} gold</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Close
      </Button>
      <Button variant="primary" onClick={handleTransaction}>
        Sell
      </Button>
    </Modal.Footer>
  </Modal>
    )
}