import { useNavigate } from "react-router-dom"
import { newPlayerInventory, restartPlayerInventory } from "../services/playerInventoryService"
import { restartPlayerStatus } from "../services/playerStatService"

export const Restart = ({authToken}) => {
    const navigate = useNavigate()

    const handleYesClick = () => {
        restartPlayerStatus(authToken)
        restartPlayerInventory(authToken)
        newPlayerInventory(authToken)
        navigate(`/instructions`)
    }

    const handleNoClick = () => {
        navigate(`/`)
    }
    return <div>
        <h1>Are you sure you want to restart?</h1>
        <button onClick={handleNoClick}>No</button>
        <button onClick={handleYesClick}>Yes</button>
    </div>
}