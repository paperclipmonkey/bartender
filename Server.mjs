import WebSocket from 'ws'
import Bartender from './Bartender.mjs'
import Recipes from './Recipes.mjs'
import Logging from './Logging.mjs'
import Config from './Config.mjs'

const port = 8080

const bartender = new Bartender()

const wss = new WebSocket.Server({ port })
Logging.log(`Starting WebSocket server on port ${port}`)

wss.on('connection', function connection(ws) {
    Logging.registerListener((log) => {
        try {
            ws.send(JSON.stringify({
                log
            }))
        } catch(e) {}
    })
    ws.on('message', function incoming(message) {
        try {
            message = JSON.parse(message)
        } catch (e) {
            Logging.error(e)
            return
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
            case 'getLiquids':
                ws.send(
                    JSON.stringify({
                        getLiquids: Config.get('liquids')
                    })
                )
                break
            case 'setLiquids':
                Config.set('liquids', message.liquids)
                ws.send(
                    JSON.stringify({
                        setLiquids: bartender.reloadLiquids()
                    })
                )
                break
        }
    })
})

function broadcastStatus (percentage) {
    const message = {
        recipeStatus: percentage
    }

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message)
        }
    })
}