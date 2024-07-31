export const getShopInformationById = (id, authToken) => {
    return fetch(`http://localhost:8000/towns/${id}`, {
        headers: {
            "Authorization": authToken
        }
    }).then((res) => res.json())
}

export const getShopMaterialPriceByTownId = (id, authToken) => {
    return fetch(`http://localhost:8000/materialprices?town_id=${id}`, {
        headers: {
            "Authorization": authToken
        }
    }).then((res) => res.json())
}