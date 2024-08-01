import { useEffect, useState } from "react"
import { getPlayerInventoryByToken } from "../services/playerInventoryService"
import { getPlayerUsername } from "../services/userService"

export const Inventory = ({authToken, playerStatus}) => {
  const [playerIn, setPlayerIn] = useState([])
  const [playerName, setPlayerName] = useState("")

  const fetchPlayerInventory = () => {
    getPlayerInventoryByToken(authToken).then(data => {
      setPlayerIn(data)
    })
  }

  const fetchUsername = () => {
    getPlayerUsername(authToken).then(data => {
      setPlayerName(data.first_name)
    })
  }

  useEffect(() => {
    fetchPlayerInventory()
    fetchUsername()
  }, [authToken])

  return (
    <main className="background">
      <h2>{playerName}'s inventory</h2>
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
