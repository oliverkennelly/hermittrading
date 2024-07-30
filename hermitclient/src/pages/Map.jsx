import React, { useEffect, useState } from 'react';
import ImageMapper from 'react-img-mapper';
import { Inventory } from '../components/Inventory';
import { useNavigate } from 'react-router-dom';
import { getPlayerStatusByToken, playerTravel } from '../services/playerStatService';


export const HermitMap = ({ authToken }) => {
    const navigate = useNavigate()
    const [playerStatus, setPlayerStatus] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [selectedTown, setSelectedTown] = useState(null);
    const [hoveredTown, setHoveredTown] = useState(null);
    const [currentTown, setCurrentTown] = useState(0)
    const TOWNS = [
        { id: 1, name: "Boatem", shape: "circle", coords: [100, 100, 20], description: "A bustling trade hub on a peninsula, full of friendly folk" },
        { id: 2, name: "Goat Empire", shape: "circle", coords: [200, 200, 20], description: "An empire built on strange and impressive machinery" },
        { id: 3, name: "Woodlands", shape: "circle", coords: [300, 300, 20], description: "A peaceful society thriving in the forests of Hermitcraft" }
    ]

    const fetchPlayerStatus = () => {
        getPlayerStatusByToken(authToken).then(data => {
        setPlayerStatus(data)
        setCurrentTown(data.current_town)
        })
    }

    const MAP = {
        name: "fantasy-map",
        areas: TOWNS.map(town => ({
          id: town.id,
          shape: town.shape,
          coords: town.coords,
        }))
      }

    const handleClick = (area) => {
        if (area.id !== currentTown) {
        setSelectedTown(area.id)
        setShowModal(true)
        }
    }

    const handleTravel = () => {
        playerTravel(authToken, playerStatus, selectedTown)
        navigate(`/shop`, {state: {selectedTown}})
        setShowModal(false)
    }

    const getTownById = (id) => TOWNS.find(town => town.id === id);

    useEffect(() => {
        fetchPlayerStatus()
        if (playerStatus.day >= 7) {
            let winConditionMet = false
            if (playerStatus.money >= 150){
                winConditionMet = true
            }
            navigate(`/end`, {state: {winConditionMet}})
        }
    }, [authToken])

    return (
        <div className="container mx-auto px-4">
            <div>
                <Inventory authToken={authToken} playerStatus={playerStatus}/>
            </div>
            <div className="relative">
            <ImageMapper
                src="/images/hermitmap.jpeg"
                map={MAP}
                onClick={handleClick}
                onMouseEnter={(area) => setHoveredTown(area.id)}
                onMouseLeave={() => setHoveredTown(null)}
                className="w-full h-auto"
            />
            
            {hoveredTown && (
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 text-white p-2 rounded">
                <h3 className="font-bold">{getTownById(hoveredTown).name}</h3>
                <p>{getTownById(hoveredTown).description}</p>
                {hoveredTown === currentTown && (
                    <p className="text-yellow-300">You are here</p>
                )}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded">
                    <h2 className="text-xl font-bold mb-4">Travel to {getTownById(selectedTown).name}?</h2>
                    <div className="flex justify-end space-x-2">
                    <button 
                        onClick={handleTravel}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Yes
                    </button>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
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