# Bartender
Raspberry Pi drinks mixer.

Controllable through a websocket or HTTP using JSON.

## Running
To run, perform an install of the npm modules `npm install` then start the WebSocket server using `node app/Server.js` or `npm run watch` to watch for changes in the source code.

## Commands
The websocket supports the commands:

* `make` - Make a given recipe
* `makeRecipe` - Make a given recipe by name
* `recipes` - Get all available recipes with the current ingredients
* `getLiquids` - Get list of liquids available and their settings
* `setLiquids` Set the liquids available


## Recipes
See [recipes.md](./recipes.md)

## Hardware
See [hardware.md](./hardware.md)