# Bartender
Raspberry Pi drinks mixer.

Controllable through a websocket using JSON.

## Running
To run, perform an install of the npm modules `npm install` then start the WebSocket server using `node Server.js` or `npm run watch` to watch for changes in the source code.

## Commands
The websocket supports the commands:

* `make` - Make a given recipe
* `recipes` - Get all available recipes with the current ingredients
* `getLiquids` - Get list of liquids available and their settings
* `setLiquids` Set the liquids available