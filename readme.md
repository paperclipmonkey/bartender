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
See [docs/recipes.md](./docs/recipes.md)

## Hardware
See [docs/hardware.md](./docs/hardware.md)

## Google Home
Google home integration is done using [IFTTT](https://ifttt.com/home). It's listening to a phrase using Google Assistant integration, and calling a webhook with a parameter to control the bartender.
The body of the request is: 

```json
{"type":"makeRecipe","recipe":" {{TextField}}"}
```