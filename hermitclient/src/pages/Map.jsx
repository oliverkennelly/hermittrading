import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPlayerStatusByToken, playerTravel } from '../services/playerStatService'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, ImageOverlay, Marker, useMap, Tooltip } from 'react-leaflet'
import { Inventory } from '../components/Inventory'

export const HermitMap = ({ authToken }) => {
    const navigate = useNavigate()
    const [playerStatus, setPlayerStatus] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [selectedTown, setSelectedTown] = useState(null);
    const [currentTown, setCurrentTown] = useState(0)
    const imageBounds = [[0,0], [894, 894]]
    const TOWNS = [
        { id: 1, name: "Boatem", shape: "circle", position: [755, 438], description: "A bustling trade hub on a peninsula, full of friendly folk" },
        { id: 2, name: "Goat Empire", shape: "circle", position: [685, 346], description: "An empire built on strange and impressive machinery" },
        { id: 3, name: "Woodlands", shape: "circle", position: [532, 388], description: "A peaceful society thriving in the forests of Hermitcraft" }
    ]
    const customIcon = new L.Icon({
        iconUrl: "/pin.svg",
        iconSize: [25, 25],
        iconAnchor: [12, 12],
    });

    const MapBoundsSetter = () => {
        const map = useMap();
        React.useEffect(() => {
          map.fitBounds(imageBounds);
        }, [map]);
        return null;
    };

    const handleTownClick = useCallback((townId) => {
        setSelectedTown(townId)
        setShowModal(prev => {
            return true
        })
    }, [setShowModal])

    const handleTravel = useCallback(() => {
        playerTravel(authToken, playerStatus, selectedTown)
        navigate(`/shop/${selectedTown}`)
        setShowModal(false)
    }, [authToken, playerStatus, selectedTown, navigate])

    useEffect(() => {
        let isMounted = true
        const fetchStatus = async () => {
            try {
                const data = await getPlayerStatusByToken(authToken)
                if (isMounted) {
                    setPlayerStatus(data)
                    setCurrentTown(data.current_town)
                }
            } catch (error) {
                console.error("Error fetching player status:", error)
            }
        }
        fetchStatus()
        return () => {
            isMounted = false
        }
    }, [authToken])

    useEffect(() => {
        if (playerStatus.day >= 7) {
            let winConditionMet = playerStatus.money >= 150
            navigate(`/end`, {state: {winConditionMet}})
        }
    }, [playerStatus, navigate])

    return (
        <div className="container mx-auto px-4">
            <div>
                <Inventory authToken={authToken} playerStatus={playerStatus}/>
            </div>
            <div className="relative z-0">
                <MapContainer
                    crs={L.CRS.Simple}
                    bounds={imageBounds}
                    style={{ height: '894px', width: '100%' }}
                    zoomControl={false}
                    dragging={false}
                    scrollWheelZoom={false}
                >
                    <MapBoundsSetter />
                    <ImageOverlay url="/images/hermitmap.jpeg" bounds={imageBounds} />
                    {TOWNS.map((town) => (
                        <Marker
                            key={town.id}
                            position={town.position}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => handleTownClick(town.id),
                                mouseover: (e) => e.target.openTooltip(),
                                mouseout: (e) => e.target.closeTooltip(),
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                                <div>
                                    <h3 className="font-bold">{town.name}</h3>
                                    <p>{town.description}</p>
                                    {town.id === currentTown && <p className="text-blue-500">You are here</p>}
                                </div>
                            </Tooltip>
                        </Marker>
                    ))}
                </MapContainer>
                {showModal && (
                    <div>
                        <div>
                            <h2>Travel to {TOWNS.find(town => town.id === selectedTown)?.name}?</h2>
                            <div>
                                <button 
                                    onClick={handleTravel}
                                >
                                    Yes
                                </button>
                                <button 
                                    onClick={() => setShowModal(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}