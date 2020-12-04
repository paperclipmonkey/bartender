require('dotenv').config()
const WebSocket = require('ws')
const Bartender = require('./Bartender.js')
const Recipes = require('./Recipes.js')
const Logging = require('./Logging.js')
const Config = require('./Config.js')
const recipes = require('./Recipes.js')

const port = process.env.PORT || 8080

const bartender = new Bartender()

const wss = new WebSocket.Server({ port })

Logging.log(`Starting WebSocket server on port ${port}`)

wss.on('connection', function connection(ws) {

    // When a new client connects register them as the new log listener
    Logging.registerListener((log) => {
        try {
            ws.send(JSON.stringify({
                log
            }))
        } catch(e) {}
    })

    ws.on('message', function incoming(message) {
        console.log(message)
        try {
            message = JSON.parse(message)
        } catch (e) {
            return console.error(e)
        }

        // Listen to messages of type and dispatch them to function handlers
        switch(message.type) {
            case 'make':
                ws.send(JSON.stringify({
                    estimate: bartender.makeDuration(message.recipe)
                }))
                bartender.make(message.recipe, () => {
                    ws.send(JSON.stringify({
                        status: 'done'
                    }))
                })
                break

            case 'recipes':
                ws.send(JSON.stringify({
                    recipes: Recipes.getAvailableRecipes(Object.keys(Config.get('liquids')))
                }))
                break
            
            case 'getIngredients':
                ws.send(
                    JSON.stringify({
                        getIngredients: Recipes.getIngredients()
                    })
                )
                break

            case 'getIngredientsAvailable':
                ws.send(
                    JSON.stringify({
                        getIngredientsAvailable: Config.get('liquids')
                    })
                )
                break
                
            case 'setIngredientsAvailable':
                Config.set('liquids', message.liquids)
                ws.send(
                    JSON.stringify({
                        setIngredientsAvailable: bartender.reloadLiquids()
                    })
                )
                break
        }
    })
})
