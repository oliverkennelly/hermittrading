export const getPlayerInventoryByToken = (authToken) => {
    const response = fetch("http://localhost:8000/playerinventory", {
        headers: {
            "Authorization": authToken
        }
    })
    return response.json()
}