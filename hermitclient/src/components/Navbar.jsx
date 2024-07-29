import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar pb-10">
            <li className="navbar__item pl-10">
                <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/games"}>Profile</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/instructions"}>Instructions</NavLink>
            </li>
            <li className="navbar__item">
                <button className="underline text-blue-600 hover:text-purple-700"
                    onClick={() => {
                        localStorage.removeItem("game_token")
                            navigate('/login')
                    }}
                >Logout</button>
            </li>
        </ul>
    )
}