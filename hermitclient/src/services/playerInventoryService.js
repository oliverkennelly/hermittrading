export const getPlayerInventoryByToken = (authToken) => {
    return fetch("http://localhost:8000/playerinventory", {
        headers: {
            "Authorization": authToken
        }
    }).then((res) => res.json())
}