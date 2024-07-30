import { useEffect, useState } from "react"
import { getPlayerStatusByToken } from "../services/playerStatService"
import { getPlayerInventoryByToken } from "../services/playerInventoryService"

export const Inventory = ({authToken, playerStatus}) => {
  const [playerIn, setPlayerIn] = useState([])

  const fetchPlayerInventory = () => {
    getPlayerInventoryByToken(authToken).then(data => {
      setPlayerIn(data)
    })
  }

  useEffect(() => {
    fetchPlayerInventory()
  }, [authToken])

  return (
    <main className="background">
      <h2>Inventory</h2>
      {playerIn.map((item) => (
        <div>
          {item.material_name}: {item.quantity}
        </div>
      ))}
      <h6>Money: {playerStatus.money} g</h6>
      <h5>Day {playerStatus.day} of 7</h5>
    </main>
  )
}
