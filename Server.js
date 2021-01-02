require('dotenv').config()
const Express = require('express')
const bodyParser = require('body-parser')
const WebSocket = require('ws')
const http = require('http')
const Bartender = require('./Bartender.js')
const Recipes = require('./Recipes.js')
const Logging = require('./Logging.js')
const Config = require('./Config.js')
const Routes = require('./routes.js')

const port = process.env.PORT || 8080

const app = Express()
app.use(bodyParser.json())
const server = http.createServer(app);

Logging.log(`Starting server on port ${port}`)
Logging.log(`GPO is: ${process.env.GPO}`)
Logging.log(`Optics is: ${process.env.SERVOS}`)

app.use(function(req,res) {
    let message = req.body
    // Listen to messages of type and dispatch them to function handlers
    switch (message.type) {
        case 'make':
            res.write(Routes.make(message))
            break
        case 'recipes':
            res.write(Routes.recipes(message))
            break
        case 'getIngredients':
            res.write(Routes.getAllIngredients(message))
            break
        case 'getIngredientsAvailable':
            res.write(Routes.getIngredientsAvailable(message))
            break
        case 'setIngredientsAvailable':
            res.write(Routes.setIngredientsAvailable(message))
            break
    }
    return res.end()
});
server.listen(port);

const wss = new WebSocket.Server({ server });

// server.on('upgrade', function upgrade(request, socket, head) {
//     wss.handleUpgrade(request, socket, head, function done(ws) {
//         wss.emit('connection', ws, request);
//     });
// });

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
                ws.send(Routes.make(message, ws))
                break
            case 'recipes':
                ws.send(Routes.recipes(message, ws))
                break
            case 'getIngredients':
                ws.send(Routes.getAllIngredients(message, ws))
                break
            case 'getIngredientsAvailable':
                ws.send(Routes.getIngredientsAvailable(message, ws))
                break
            case 'setIngredientsAvailable':
                ws.send(Routes.setIngredientsAvailable(message, ws))
                break
        }
    })
})
