import { useEffect, useState } from "react"
import { Input } from "../components/form-elements/input"
import { editPlayerUsername, getPlayerUsername } from "../services/userService"
import { useNavigate } from "react-router-dom"

export const Profile = ({authToken}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    const fetchUsername = () => {
        getPlayerUsername(authToken).then(data => {
            setUsername(data)
        })
    }

    const handleConfirm = async () => {
        try {
            await editPlayerUsername(authToken, username)
            navigate(`/`)
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError("This username is already taken. Please choose another.")
            } else {
                setError("An error occurred. Please try again.")
            }
        }
    }

    const handleCancel = () => {
        navigate(`/`)
    }

    useEffect(() => {
        fetchUsername()
    }, [authToken])

    return <div>
        <h1>Profile Settings</h1>
        <Input
            type="text"
            label="Username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value) 
                setError("")}}
        />
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleConfirm}>Confirm</button>
    </div>
}