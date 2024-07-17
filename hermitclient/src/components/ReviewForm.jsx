import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ReviewForm = ({authToken}) => {
    const navigate = useNavigate()
    const gameObj = useParams()
    const gameIdInt = parseInt(gameObj.gameId)
    const [review, setReview] = useState({
        "game_id": gameIdInt,
        "score": 0,
        "comment": ""
    })

    const createReview = async (evt) => {
        evt.preventDefault()

        await fetch("http://localhost:8000/reviews", {
            method: "POST",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })

        navigate(`/view/${gameIdInt}`)
    }

    return (
        <div>
            Write a Review
            <textarea
                onChange={e => {
                    const copy = { ...review }
                    copy.comment = e.target.value
                    setReview(copy)
                }}
            value={review.comment} className="form-control"/>
            <fieldset className="mt-4">
                <label htmlFor="review">Score:</label>
                <input id="review" type="number"
                    onChange={e => {
                        const copy = { ...review }
                        copy.score = e.target.value
                        setReview(copy)
                    }}
                value={review.score} className="form-control" />
            </fieldset>
            <button type="submit"
                    onClick={createReview}
                    className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                    Submit Review
            </button>
        </div>
    )
}