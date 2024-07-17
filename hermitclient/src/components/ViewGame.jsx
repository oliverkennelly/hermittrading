import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ViewGame = ({authToken}) => {
    const navigate = useNavigate()
    const {gameId} = useParams()
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])

    const fetchGame = async () => {
        const response = await fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": authToken
            }
        })
        const gameReply = await response.json()
        setGame(gameReply)
    }

    const fetchReviews = async () => {
        const response = await fetch(`http://localhost:8000/reviews?game=${gameId}`, {
            headers: {
                "Authorization": authToken
            }
        })
        const reviewReply = await response.json()
        setReviews(reviewReply)
    }

    useEffect(()=>{
        fetchGame()
        fetchReviews()
    }, [gameId])

    return (
        <div key={`key-${game.id}`}>
                {game.title} (by {game.designer})
                {game.description}
                Released {game.year_released}
                Players: {game.number_of_players}
                Age Recomendation: {game.age_rec}
                <div>Categories: {game.categories}</div>
                <button type="submit"
                    onClick={()=>{navigate(`/edit/${gameId}`)}}
                    className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                    Edit Game
                </button>
                <button type="submit"
                    onClick={()=>{navigate(`/view/${gameId}/review`)}}
                    className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                    Leave Review
                </button>
                <button type="submit"
                    onClick={()=>{navigate(`/view/${gameId}/upload`)}}
                    className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                    Upload Image
                </button>
                <div>
                    Reviews:
                    {
                        reviews.map(r => <div key={r.id}>
                            score: {r.score}
                            <div>{r.comment}</div>
                        </div>)
                    }
                </div>
        </div>
    )
}