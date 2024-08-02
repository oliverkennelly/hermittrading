import { useEffect, useState } from "react"
import { Input } from "../components/form-elements/input"
import { editPlayerUsername, getPlayerUsername } from "../services/userService"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

export const Profile = ({authToken}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const fetchUsername = () => {
        getPlayerUsername(authToken).then(data => {
            setUsername(data.username)
            setFirstName(data.first_name)
            setLastName(data.last_name)
        })
    }

    const handleConfirm = () => {
        editPlayerUsername(authToken, {"username": username, "first_name": firstName, "last_name": lastName})
        navigate(`/`)
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
            label="Email"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value) }}
        />
        <Input
            type="text"
            label="First Name"
            value={firstName}
            onChange={(e) => {
                setFirstName(e.target.value) }}
        />
        <Input
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(e) => {
                setLastName(e.target.value) }}
        />
        <Button variant="primary" onClick={handleCancel}>Cancel</Button>
        <Button variant="secondary" onClick={handleConfirm}>Confirm</Button>
    </div>
}