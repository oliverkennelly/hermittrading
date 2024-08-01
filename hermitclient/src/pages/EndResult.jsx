import { useNavigate, useParams } from "react-router-dom"

export const EndResult = () => {
    const navigate = useNavigate()
    const {win} = useParams()

    const handleButtonClick = () => {
        navigate(`/reset`)
    }

    return (<main>
        {win ? (
            <h1> You win </h1>
        ) : (
            <h1> You lose </h1>
        )}
        <button onClick={handleButtonClick}>Play again!</button>
    </main>)
}