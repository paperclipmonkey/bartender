require('dotenv').config()
const Bartender = require('./Bartender.js')
const Recipes = require('./Recipes.js')
const Config = require('./Config.js')

const bartender = new Bartender()

function make(message, ws) {
    bartender.make(message.recipe, () => {
        try {
            ws.send(JSON.stringify({
                status: 'done'
            }))
        } catch(e) {}
    })

    return JSON.stringify({
        estimate: bartender.makeDuration(message.recipe)
    })
}

function recipes(message, ws) {
    return JSON.stringify({
        recipes: Recipes.getAvailableRecipes(Config.getAllAvailable())
    })
}

function getAllIngredients(message, ws) {
    return JSON.stringify({
        getIngredients: Recipes.getIngredients()
    })
}

function getIngredientsAvailable(message, ws) {
     return JSON.stringify({
        getIngredientsAvailable: Config.getConfig()
    })
}

function setIngredientsAvailable(message, ws) {
    Config.setConfig(message.available)
    return JSON.stringify({
        setIngredientsAvailable: bartender.reloadIngredients()
    })
}

module.exports = {
    make,
    recipes,
    getAllIngredients,
    getIngredientsAvailable,
    setIngredientsAvailable
}