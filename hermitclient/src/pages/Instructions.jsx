import { useNavigate } from "react-router-dom"
import { Button } from 'react-bootstrap'

export const Instructions = () => {
    const navigate = useNavigate()
    return <main>
        <h1>How to Play</h1>
        <p>
            You leave the comforts of your home village to venture on a journey
            to fulfill your dreams of traveling the known world. Traveling doesn't pay itself
            though! You've taken out a loan of 150 gold to be paid in a week to start yourself on
            your quest, buying yourself a wagon, an ox, and some materials to sell to other cities.
            After all these expenses, you have only 50 gold left.
        </p>
        <p>
            Travel the world of Hermitcraft and buy and sell goods! Different locations have different
            prices for their wares, and they'll buy your goods at different prices depending on the demands
            of the region. Traveling to each city takes a day of your time, so choose carefully!
        </p>
        <Button variant="primary"
        onClick={() => {
            navigate('/')
        }}>Start your adventure!</Button>
    </main>
}