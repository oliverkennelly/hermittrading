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
      <div className="d-flex justify-content-start align-items-end" 
             style={{
                 backgroundImage: `url('/images/inventorybar.png')`,
                 backgroundSize: 'contain',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'left center',
                 height: '80px', // Adjust this value to match your inventory bar height
                 padding: '5px 5px'
             }}>
            {playerIn.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handlePlayerSelling(item.material)}
                    className="text-center text-light"
                    style={{
                        backgroundColor: 'none',
                        cursor: 'pointer',
                        width: '50px', // Adjust to match your icon width
                        marginRight: '2px' // Minimal spacing between icons
                    }}
                >
                    <img src={`/images/${item.material_name}.png`} 
                         alt={item.material_name} 
                         style={{
                             width: '100%',
                             height: 'auto',
                             maxHeight: '50px' // Adjust to match your icon height
                         }} />
                    <div className="text-light" style={{fontSize: '0.8em'}}>{item.quantity}x</div>
                </div>
            ))}
        </div>
      <h6>Money: {playerStatus.money} g</h6>
      <h5>Day {playerStatus.day} of 7</h5>
    </main>
  )
}
