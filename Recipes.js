const path = require('path')
const fs = require('fs')

const RECIPE_DIRECTORY = './recipes'

class Recipes {
    constructor() {
        this.recipes = []
        this.ingredientsInfo = []
        this.setup();
    }

    // Read the recipes from directory
    setup() {
        fs.readdirSync(RECIPE_DIRECTORY).forEach((file) => {
                this.recipes.push(
                        JSON.parse(fs.readFileSync(path.join(RECIPE_DIRECTORY, file), 'utf8'))
                    );
            });
        this.ingredientsInfo = JSON.parse(fs.readFileSync('./ingredients-info.json'))
    }

    getAllRecipes() {
        return this.recipes
    }

    getRecipeUnits(recipe) {
        const ingredients = this.getRecipeIngredients(recipe)
        return ingredients.reduce((total, ingredient) => {
            if(this.ingredientsInfo[ingredient.name]) {
                return total + (ingredient.amount * this.ingredientsInfo[ingredient.name].percentage / 1000) // Units for each item
            } 
            return total;
        }, 0)
    }

    getRecipeIngredients(recipe) {
        return recipe.steps.reduce((accum, step) => { // Loop over steps
            return accum.concat(
                step.ingredients.reduce((accum, ingredient) => accum.concat(ingredient), [])
                )
        }, [])
    }

    // List the available recipes
    // given these ingredients
    getAvailableRecipes(availableIngredients = []) {
        return this.recipes.filter((recipe) => {
            return !recipe.steps.reduce((accumm, step) => { // Loop over steps. Negate result
                return accumm || step.ingredients.reduce((accum, ingredient) => { // Loop over ingredients
                    return accum || !availableIngredients.includes(ingredient.name) // Check if exists
                }, false) // False means found
            }, false) // True means not found
        }).map((recipe) => {
            return {
                ...recipe,
                units: this.getRecipeUnits(recipe)
            }
        })
    }
}

const recipes = new Recipes()

module.exports = recipes;
