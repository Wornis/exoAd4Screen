const allItems = require('../../vendor/items')
const allUsers = require('../../vendor/users')

getUserViewedArticles = (req, res) => {
    const userId = req.params.id
    let userActions = allUsers[userId] // On récupère les actions de l'user

    res.setHeader('Content-Type', 'application/json')
    if (userActions === undefined)
        res.sendStatus(400)
    else {
        let userItems = getViewedItems(userActions)
        res.send(userItems)
    }
}


/**
 * Itere sur chaque actions afin de récupérer au final les items unique visités par l'user
 * @param userActions {Array} Toutes les actions de l'user
 * @returns {Array | Object} Retourne l'array des items traités ou un objet vide
 */
getViewedItems = (userActions) => {
    let userItems = []
    let itemsKeyAdded = []

    Object.keys(userActions).every(key => {
        // On traite seulement les actions 'af_content_view' de l'user
        if (key.includes('af_content_view')) {
            const itemId = userActions[key]
            const item = allItems[itemId] || {}

            if (!checkIfItemExistInArray(itemsKeyAdded, itemId)) { // On verifie que l'item n'a pas deja été ajouté
                userItems.push(item)
                itemsKeyAdded.push(itemId)

                if (userItems.length === 3) // Si on a déjà récupéré 3 items, on arrête la boucle
                    return false
            }
        }
        return true
    })
    if (userItems.length === 0) // Si array vide, on retourne un objet vide
        userItems = {}

    return userItems
}

/**
 * Retourne true des que l'itemId passé en paramètre est déjà présent dans l'array
 * @param itemsKeyAdded {Array} les clés des items déjà ajouté
 * @param itemId la clé de l'item que l'on souhaite ajouté
 * @return {Boolean} Retourne true si un itemKey existe déjà dans itemsKeyAdded
 */
checkIfItemExistInArray = (itemsKeyAdded, itemId) => {
    return itemsKeyAdded.some(key => {
        return key === itemId
    })
}

module.exports = {getUserViewedArticles, getViewedItems, checkIfItemExistInArray}