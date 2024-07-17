import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Games = ({authToken}) => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    const fetchGames = async () => {
        const response = await fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": authToken
            }
        })
        const gameReply = await response.json()
        setGames(gameReply)
    }

    const fetchGamesWithQuery = async (query) => {
        const url = `http://localhost:8000/games?q=${query}`;
        const response = await fetch(url, {
            headers: {
                "Authorization": authToken
            }
        });
        const gameReply = await response.json();
        setGames(gameReply);
    };

    const fetchFilteredGames = async (value) => {
        let query = ""
        switch (value) {
            case 1:
                query = "-year_released"
                break;
            case 2:
                query = "-estimated_time"
                break;
            case 3:
                query = "designer"
        }
        const url = `http://localhost:8000/games?order_by=${query}`;
        const response = await fetch(url, {
            headers: {
                "Authorization": authToken
            }
        });
        const gameReply = await response.json();
        setGames(gameReply);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            fetchGamesWithQuery(searchQuery);
        }
    };

    useEffect(() => {
        fetchGames()
    }, [])

    const displayGames = () => {
        if (games && games.length) {
            return games.map(game => <div key={`key-${game.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                {game.title} (by {game.designer})
                Score: {game.average_score} 
                {game.description} 
                Released {game.year_released} 
                Players: {game.number_of_players} 
                Play Time: {game.estimated_time}
                Age Recomendation: {game.age_rec} 
                <div>Categories: {game.categories}</div>
                <button type="submit"
                    onClick={()=>{navigate(`/view/${game.id}`)}}
                    className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                    View Game
                </button>
            </div>)
        }

        return <h3>No games found.</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Game List</h1>
            <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={e => {
                    setSearchQuery(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded-md p-2 mb-4"
            />
             <fieldset className="mt-4">
                        <label htmlFor="category"> Filter </label>
                        <br />
                        <select id="category" className="form-control"
                            onChange={(v) => fetchFilteredGames(parseInt(v.target.value))}>
                            <option value={0}>- All games -</option>
                            <option value={1}> Year released </option>
                            <option value={2}> Estimated time</option>
                            <option value={3}> Designer </option>
                        </select>
                    </fieldset>
            {displayGames()}
        </>
    )
}