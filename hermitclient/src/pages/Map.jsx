import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPlayerStatusByToken } from "../services/playerStatService"

export const Map = ({authToken}) => {
  const navigate = useNavigate()
  const playerName = "player"
  const [playerStatus, setPlayerStatus] = useState({})

  const fetchPlayerStatus = () => {
    getPlayerStatusByToken(authToken).then(data => {
      setPlayerStatus(data)
    })
  }

  useEffect(() => {
    fetchPlayerStatus
  }, [authToken])

  return (
    <main className='text-slate-900 pl-10 pr-10'>
      <h2>{playerName} Inventory</h2>
      <h6>Money: {playerStatus.money} g</h6>
      <h5>Day {playerStatus.day} of 7</h5>
    </main>
  )
}
