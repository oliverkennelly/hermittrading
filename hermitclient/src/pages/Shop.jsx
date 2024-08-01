import { useEffect, useState } from "react"
import { getPlayerInventoryByToken } from "../services/playerInventoryService"
import { getShopInformationById, getShopMaterialPriceByTownId } from "../services/shopService"
import { useParams } from "react-router-dom"
import { getPlayerStatusByToken } from "../services/playerStatService"
import BuyModal from "../components/buy-modal"
import SellModal from "../components/sell-modal"

export const Shop = ({authToken}) => {
    const {townId} = useParams()
    const [showBuyModal, setShowBuyModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)
    const [playerIn, setPlayerIn] = useState([])
    const [shopPrices, setShopPrices] = useState([])
    const [shopInfo, setShopInfo] = useState({})
    const [selectedMaterialId, setSelectedMaterialId] = useState(null)
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
    }, [authToken, showBuyModal, showSellModal])

    const handlePlayerPurchase = (id) => {
        setSelectedMaterialId(id)
        setShowBuyModal(true)
    }

    const handlePlayerSelling = (id) => {
        setSelectedMaterialId(id)
        setShowSellModal(true)
    }

    return (<>
    {showBuyModal ? <BuyModal authToken={authToken} showModal={showBuyModal} setShowModal={setShowBuyModal} currentMoney={playerStatus.money} materialPriceInfo={shopPrices.find(item => item.material === selectedMaterialId)}/> : <></>}
    {showSellModal ? <SellModal authToken={authToken} showModal={showSellModal} setShowModal={setShowSellModal} currentMoney={playerStatus.money} materialPriceInfo={shopPrices.find(item => item.material === selectedMaterialId)} playerInventoryItem={playerIn.find(item => item.material === selectedMaterialId)}/> : <></>}
    <div>
        <div>
            <h1>{shopInfo.name}</h1>
            <p>{shopInfo.npc_greeting}</p>
            <h2>Items for sale:</h2>
            {shopPrices
                .filter(item => item.sold)
                .map((item) => (
                    <div 
                        key={item.id}
                        onClick={() => handlePlayerPurchase(item.material)}
                    >
                        {item.material_name} {item.quantity} for {item.max_price} g
                    </div>
                ))
            }
        </div>
        <div>
            <h2>Inventory</h2>
                {playerIn.map((item) => (
                    <div
                    key={item.id}
                    onClick={() => handlePlayerSelling(item.material)}>
                    {item.material_name}: {item.quantity}
                    </div>
                ))}
            <h6>Money: {playerStatus.money} g</h6>
            <h5>Day {playerStatus.day} of 7</h5>
        </div>
    </div></>)
}