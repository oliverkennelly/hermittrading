export const getPlayerStatusByToken = (authToken) => {
    return fetch("http://localhost:8000/playerstatus", {
        headers: {
            "Authorization": authToken
        }
    }).then((res) => res.json())
}

export const playerTravel = (authToken, playerStatus, selectedTown) => {
    const editedStatus = {...playerStatus}
    editedStatus.current_town = selectedTown
    editedStatus.day = playerStatus.day + 1
    return fetch(`http://localhost:8000/playerstatus/update_status`, {
        method: "PUT",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedStatus),
    })
}

export const newPlayerStatus = (authToken) => {
    return fetch(`http://localhost:8000/playerstatus`, {
        method: "POST",
        headers: {
            "Authorization": authToken,
        },
    })
}

export const restartPlayerStatus = (authToken) => {
    const starterStatus = {
        "current_town": 1,
        "day": 1,
        "money": 50
    }
    return fetch(`http://localhost:8000/playerstatus/update_status`, {
        method: "PUT",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(starterStatus),
    })
}

export const playerPurchase = (authToken, playerStatus, cost) => {
    const editedStatus = {...playerStatus}
    editedStatus.money = playerStatus.money - cost
    return fetch(`http://localhost:8000/playerstatus/update_status`, {
        method: "PUT",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedStatus),
    })
}

export const playerSell = (authToken, playerStatus, profit) => {
    const editedStatus = {...playerStatus}
    editedStatus.money = playerStatus.money + profit
    return fetch(`http://localhost:8000/playerstatus/update_status`, {
        method: "PUT",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedStatus),
    })
}