import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const GameForm = ({authToken}) => {
    const initialGameState = {
        "title": "",
        "designer": "",
        "description": "",
        "year_released": 0,
        "number_of_players": 0,
        "estimated_time": 0,
        "age_rec": 0,
        "categories": [
            0
        ]
    }

    const [categories, changeCategories] = useState([{ id: 1, label: "Strategy" }, { id: 2, label: "Dice" }])
    const [game, updateGameProps] = useState(initialGameState)
    const navigate = useNavigate()

    const fetchCategories = async () => {
        const response = await fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": authToken
            }
        })
        const categories = await response.json()
        changeCategories(categories)
    }

    useEffect(() => {
        fetchCategories()
    }, [])


    const createGame = async (evt) => {
        evt.preventDefault()

        await fetch("http://localhost:8000/games", {
            method: "POST",
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
                    <fieldset className="mt-4">
                        <label htmlFor="category"> Category </label>
                        <br />
                        <select id="category" className="form-control"
                            onChange={e => {
                                const copy = { ...game }
                                copy.categories[0] = parseInt(e.target.value)
                                updateGameProps(copy)
                            }}>
                            <option value={0}>- Select a category -</option>
                            {
                                categories.map(t => <option
                                    key={`category-${t.id}`}
                                    value={t.id}>{t.label}</option> )
                            }
                        </select>
                    </fieldset>

                    <fieldset>
                        <button type="submit"
                            onClick={createGame}
                            className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                            Create Game
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}