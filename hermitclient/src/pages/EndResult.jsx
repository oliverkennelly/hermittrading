import { useParams } from "react-router-dom"

export const EndResult = () => {
    const {winConditionMet} = useParams()
    return (<main>
        {winConditionMet ? (
            <h1> You win </h1>
        ) : (
            <h1> You lose </h1>
        )}
    </main>)
}