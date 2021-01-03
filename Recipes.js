const path = require('path')
const fs = require('fs')

const RECIPE_DIRECTORY = './recipes'

/**
 * Handle all recipes
 * Loads them from sub folder
 * Supports getting recipes we can currently make with the ingredients available
 */
class Recipes {
    constructor() {
        this.recipes = []
        this.ingredientsInfo = []
        this.setup()
    }

    // Read the recipes from directory
    setup() {
        fs.readdirSync(RECIPE_DIRECTORY).forEach((file) => {
                this.recipes.push(
                        JSON.parse(fs.readFileSync(path.join(RECIPE_DIRECTORY, file), 'utf8'))
                    )
            })
        this.ingredientsInfo = JSON.parse(fs.readFileSync('./ingredients-info.json'))
    }

    getAllRecipes() {
        return this.recipes
    }

    // Ingredients from all recipes
    // Essentially anything that could be added
    // To the bartender
    getIngredients(){
        return [
            ...new Set( // Unique values. Ingredient name only once.
                this.getAllRecipes()
                    .reduce((accum, recipe) => accum.concat(this.getRecipeIngredients(recipe)),[]) // Pull ingredients from recipe
                    .map(ingredient => ingredient.name) // Only get the name
            )
        ].sort()
    }

    // Add units to Recipe
    getRecipeWithUnits(recipe) {
        return {
            ...recipe,
            units: Math.round(this.getRecipeUnits(recipe) * 10) / 10
        }
    }

    // Number of units of alcohol in the drink
    getRecipeUnits(recipe) {
        return this.getRecipeIngredients(recipe)
            .reduce((total, ingredient) => {
                return total + ingredient.amount * (this.ingredientsInfo[ingredient.name] ? this.ingredientsInfo[ingredient.name].percentage / 1000 : 0)
            }, 0)
    }

    // recipes ingredients taken from the recipe steps
    // As objects, with amounts
    getRecipeIngredients(recipe) {
        return recipe.steps
            .reduce((accum, step) => { // Loop over steps
                return accum.concat(
                    step.ingredients.reduce((accum, ingredient) => accum.concat(ingredient), [])
                )
            }, [])
    }

    // List the available recipes
    // refactor to use getRecipeIngredients
    getAvailableRecipes(availableIngredients = []) {
        return this.getAllRecipes().filter((recipe) => {
            return this.getRecipeIngredients(recipe)
                .map(ingredient => ingredient.name) // Only get the name
                .every(ingredient => availableIngredients.includes(ingredient)) // Ensure every item is available
        }).map((recipe) => this.getRecipeWithUnits(recipe))
    }
}

const recipes = new Recipes()

module.exports = recipes
