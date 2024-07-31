import { useEffect, useState } from "react"
import { getPlayerInventoryByToken } from "../services/playerInventoryService"
import { getShopInformationById, getShopMaterialPriceByTownId } from "../services/shopService"
import { useParams } from "react-router-dom"
import TradeModal from "../components/trade-modal"
import { getPlayerStatusByToken } from "../services/playerStatService"

export const Shop = ({authToken}) => {
    const {townId} = useParams()
    const [showModal, setShowModal] = useState(false)
    const [playerIn, setPlayerIn] = useState([])
    const [shopPrices, setShopPrices] = useState([])
    const [shopInfo, setShopInfo] = useState({})
    const [playerBuying, setPlayerBuying] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState(null)
    const [playerStatus, setPlayerStatus] = useState({})

    const fetchShopInformation = () => {
        getShopInformationById(townId, authToken).then(data => {
            setShopInfo(data)
        })
    }

    const fetchPlayerInventory = () => {
        getPlayerInventoryByToken(authToken).then(data => {
          setPlayerIn(data)
        })
        getPlayerStatusByToken(authToken).then(data => {
            setPlayerStatus(data)
        })
    }

    const fetchShopPrices = () => {
        getShopMaterialPriceByTownId(townId, authToken).then(data => {
            setShopPrices(data)
        })
    }

    useEffect(() => {
        fetchShopInformation()
        fetchShopPrices()
    }, [authToken])
    
    useEffect(() => {
        fetchPlayerInventory()
    }, [authToken, showModal])

    const handlePlayerPurchase = (id) => {
        setPlayerBuying(true)
        setSelectedMaterial(id)
        setShowModal(true)
    }

    const handlePlayeSelling = (id) => {
        setPlayerBuying(false)
        setSelectedMaterial(id)
        setShowModal(true)
    }

    return (<>
    <TradeModal authToken={authToken} showModal={showModal} setShowModal={setShowModal} currentMoney={playerStatus.money} buying={playerBuying} materialPriceId={selectedMaterial}/>
    <div>
        <div>
            <h1>{shopInfo.name}</h1>
            <p>{shopInfo.npc_greeting}</p>
            <img src={shopInfo.npc}/>
            <h2>Items for sale:</h2>
            {shopPrices
                .filter(item => item.selling)
                .map((item) => (
                    <div 
                        key={item.id}
                        onClick={() => handlePlayerPurchase(item.id)}
                    >
                        {item.material_name}: {item.quantity} for {item.max_price}
                    </div>
                ))
            }
        </div>
        <div>
            <h2>Inventory</h2>
                {playerIn.map((item) => (
                    <div
                    key={item.id}
                    onClick={() => handlePlayeSelling(item.id)}>
                    {item.material_name}: {item.quantity}
                    </div>
                ))}
            <h6>Money: {playerStatus.money} g</h6>
            <h5>Day {playerStatus.day} of 7</h5>
        </div>
    </div></>)
}