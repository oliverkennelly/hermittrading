import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Map = ({authToken}) => {
  const navigate = useNavigate()
  const playerName = "player"
  const playerStatus = useState({})

  return (
    <main className='text-slate-900 pl-10 pr-10'>
      <h2>{playerName} Inventory</h2>
      <h6>Money: {playerStatus.money} g</h6>
      <h5>Day {playerStatus.day} of 7</h5>
    </main>
  )
}
