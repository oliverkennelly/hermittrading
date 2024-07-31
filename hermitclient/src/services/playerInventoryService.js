export const getPlayerInventoryByToken = (authToken) => {
    return fetch("http://localhost:8000/playerinventory", {
        headers: {
            "Authorization": authToken
        }
    }).then((res) => res.json())
}

export const updatePlayerInventoryById = ( authToken, id, invBody) => {
    return fetch(`http://localhost:8000/playerinventory/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(invBody),
    }).then((res) => res.json())
}

export const restartPlayerInventory = (authToken) => {
    //two fetch calls, one that wipes inventory, make api side support for that
    // second call will POST with basic items
}