
const RECIPE_DIRECTORY = './recipes'

import path from 'path'
import fs from 'fs'

class Recipes {
    constructor() {
        this.recipes = []
        this.setup();
    }

    // Read the recipes in from directory
    setup() {
        fs.readdirSync(RECIPE_DIRECTORY).forEach((file) => {
                this.recipes.push(
                        JSON.parse(fs.readFileSync(path.join(RECIPE_DIRECTORY, file), 'utf8'))
                    );
            });
    }

    getAllRecipes() {
        return this.recipes
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
        })
    }
}

const recipes = new Recipes()

export default recipes;
