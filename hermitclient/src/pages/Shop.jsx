import { useEffect, useState } from "react"
import { Container, Row, Col, Image, Modal } from 'react-bootstrap'
import { getPlayerInventoryByToken } from "../services/playerInventoryService"
import { getShopInformationById, getShopMaterialPriceByTownId } from "../services/shopService"
import { useParams } from "react-router-dom"
import { getPlayerStatusByToken } from "../services/playerStatService"
import BuyModal from "../components/buy-modal"
import SellModal from "../components/sell-modal"
import "./Shop.css"

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

    const getNpcImage = (townId) => {
        switch(townId) {
            case "1": return "/images/scar.png";
            case "2": return "/images/doc.png";
            case "3": return "/images/gem.png";
            default: return "";
        }
    }

    return (
        <Container fluid className="p-0" style={{
            backgroundImage: `url('${getNpcImage(townId)}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center'
        }}>
          {showBuyModal && <BuyModal authToken={authToken} showModal={showBuyModal} setShowModal={setShowBuyModal} playerStatus={playerStatus} materialPriceInfo={shopPrices.find(item => item.material === selectedMaterialId)} playerInventoryItem={playerIn.find(item => item.material === selectedMaterialId)} fetchPlayerInventory={fetchPlayerInventory}/>}
          {showSellModal && <SellModal authToken={authToken} showModal={showSellModal} setShowModal={setShowSellModal} playerStatus={playerStatus} materialPriceInfo={shopPrices.find(item => item.material === selectedMaterialId)} playerInventoryItem={playerIn.find(item => item.material === selectedMaterialId)} fetchPlayerInventory={fetchPlayerInventory}/>}
          
          <div style={{
                width: '80%',
                maxWidth: '900px',
                marginLeft: '2%',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                paddingLeft: '100px',
                paddingTop: '100px',
                padding: '20px',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div className="flex-grow-1 d-flex flex-column justify-content-around">
    <div>
        <h2 className="text-dark">Items for sale:</h2>
        <div className="d-flex justify-content-start align-items-end" 
             style={{
                 backgroundImage: `url('/images/inventorybar.png')`,
                 backgroundSize: 'contain',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'left center',
                 height: '80px', // Adjust this value to match your inventory bar height
                 padding: '5px 5px'
             }}>
            {shopPrices
                .filter(item => item.sold)
                .map((item) => (
                    <div 
                        key={item.id}
                        onClick={() => handlePlayerPurchase(item.material)}
                        className="text-center text-light"
                        style={{
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
                        <div className="text-light" style={{fontSize: '0.8em'}}>{item.max_price} g</div>
                    </div>
                ))
            }
        </div>
    </div>
    
    <div>
        <h2 className="text-dark">Inventory</h2>
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
        <h6 className="text-dark mt-3">Money: {playerStatus.money} g</h6>
        <h5 className="text-dark">Day {playerStatus.day} of 7</h5>
    </div>
</div>
                <div className="bg-dark text-light p-3 mb-4" style={{borderRadius: '5px', width: '95%', alignSelf: 'center'}}>
                    <h1>{shopInfo.name}</h1>
                    <p>{shopInfo.npc_greeting}</p>
                </div>
            </div>
        </Container>
    )
}