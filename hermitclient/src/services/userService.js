export const getPlayerUsername = (authToken ) => {
    return fetch("http://localhost:8000/users/me", {
        headers: {
            "Authorization": authToken
        }
    }).then((res) => res.json())
}

export const editPlayerUsername = (authToken, body) => {
    return fetch(`http://localhost:8000/users/update-username`, {
        method: "PUT",
        headers: {
            "Authorization": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
}