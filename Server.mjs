import WebSocket from 'ws'
import Bartender from './Bartender.mjs'
import Recipes from './Recipes.mjs'
import Logging from './Logging.mjs'

const port = 8080

const bartender = new Bartender()

const wss = new WebSocket.Server({ port })
Logging.log(`Starting WebSocket server on port ${port}`)

wss.on('connection', function connection(ws) {
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
                Logging.log(bartender.makeDuration(message.recipe))
                if(!message.recipe) break;
                ws.send(JSON.stringify(
                    bartender.makeDuration(message.recipe)
                ))
                bartender.make(message.recipe, () => {
                    ws.send(JSON.stringify('done'))
                })
                break
            case 'recipes':
                ws.send(JSON.stringify(
                    Recipes.getAvailableRecipes(
                        bartender.getIngredients()
                    ))
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