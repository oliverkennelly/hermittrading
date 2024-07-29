export const getPlayerStatusByToken = (authToken) => {
    const response = fetch("http://localhost:8000/playerstatus", {
        headers: {
            "Authorization": authToken
        }
    })
    return response.json()
}