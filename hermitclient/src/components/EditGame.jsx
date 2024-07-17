import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditGame = ({authToken}) => {
    const [game, updateGameProps] = useState({})
    const navigate = useNavigate()
    const gameObj = useParams()
    const gameIdInt = parseInt(gameObj.gameId)

    const fetchGame = async () => {
        const response = await fetch(`http://localhost:8000/games/${gameIdInt}`, {
            method: "GET",
            headers: {
                "Authorization": authToken,
            }
        })
        const gameBody = await response.json()
        updateGameProps(
            {
                "id": gameBody.id,
                "title": gameBody.title,
                "designer": gameBody.designer,
                "description": gameBody.description,
                "year_released": gameBody.year_released,
                "number_of_players": gameBody.number_of_players,
                "estimated_time": gameBody.estimated_time,
                "age_rec": gameBody.age_rec
            }
        )
    }

    useEffect(() => {
        fetchGame()
    }, [])


    const updateGame = async (evt) => {
        evt.preventDefault()

        await fetch(`http://localhost:8000/games/${gameIdInt}`, {
            method: "PUT",
            headers: {
                "Authorization": authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })

        navigate("/games")
    }

    return(
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={() => { }}>
                    <h1 className="text-3xl">Enter new game</h1>
                    <fieldset className="mt-4">
                        <label htmlFor="game">Title:</label>
                        <input id="game" type="text"
                            onChange={e => {
                                const copy = { ...game }
                                copy.title = e.target.value
                                updateGameProps(copy)
                            }}
                            value={game.title} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="game">Designer:</label>
                        <input id="game" type="text"
                            onChange={e => {
                                const copy = { ...game }
                                copy.designer = e.target.value
                                updateGameProps(copy)
                            }}
                            value={game.designer} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="game">Description:</label>
                        <input id="game" type="text"
                            onChange={e => {
                                const copy = { ...game }
                                copy.description = e.target.value
                                updateGameProps(copy)
                            }}
                            value={game.description} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="game">Year Released:</label>
                        <input id="game" type="number"
                            onChange={e => {
                                const copy = { ...game }
                                copy.year_released = e.target.value
                                updateGameProps(copy)
                            }}
                            value={game.year_released} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="game">Number of Players:</label>
                        <input id="game" type="number"
                            onChange={e => {
                                const copy = { ...game }
                                copy.number_of_players = e.target.value
                                updateGameProps(copy)
                            }}
                            value={game.number_of_players} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="game">Estimated Time (in minutes):</label>
                        <input id="game" type="number"
                            onChange={e => {
                                const copy = { ...game }
                                copy.estimated_time = e.target.value
                                updateGameProps(copy)
                            }}
                            value={game.estimated_time} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="game">Age Recommendation:</label>
                        <input id="game" type="number"
                            onChange={e => {
                                const copy = { ...game }
                                copy.age_rec = e.target.value
                                updateGameProps(copy)
                            }}
                            value={game.age_rec} className="form-control" />
                    </fieldset>
                    <fieldset>
                        <button type="submit"
                            onClick={updateGame}
                            className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                            Update Game
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}