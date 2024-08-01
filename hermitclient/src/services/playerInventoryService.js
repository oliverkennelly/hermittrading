export const getPlayerInventoryByToken = (authToken) => {
    return fetch("http://localhost:8000/playerinventory", {
        headers: {
            "Authorization": authToken
        }
    }).then((res) => res.json())
}

export const createPlayerInventoryItem = (authToken, body) => {
    return fetch(`http://localhost:8000/playerinventory`, {
        method: "POST",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
}

export const updatePlayerInventoryById = ( authToken, id, invBody) => {
    return fetch(`http://localhost:8000/playerinventory/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(invBody),
    })
}

export const deletePlayerInventoryItemById = ( authToken, id) => {
    return fetch(`http://localhost:8000/playerinventory/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": authToken
        },
    })
}

export const restartPlayerInventory = (authToken) => {
    return fetch(`http://localhost:8000/playerinventory/reset`, {
        method: "DELETE",
        headers: {
            "Authorization": authToken
        },
    })
}

export const newPlayerInventory = (authToken) => {
    return fetch(`http://localhost:8000/playerinventory/new`, {
        method: "POST",
        headers: {
            "Authorization": authToken,
        }
    })
}