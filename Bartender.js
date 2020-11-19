const Optic = require('./Optic.js')
const Pump = require('./Pump.js')
const Logging = require('./Logging.js')
const Config = require('./Config.js')

class Bartender {
    constructor() {
        this.liquids = {}
        this.setup(Config.get('liquids'))
    }

    setup(liquids) {
        for (const [name, value] of Object.entries(liquids)) {
            this.liquids[name] = value.type === 'optic' ? 
                new Optic(name, value.pin)
                : new Pump(name, value.pin)
        }
    }

    // Estimate the dispense duration in ms
    dispenseDuration(ingredient, amount) {
        if (!ingredient in this.liquids) return Logging.log(`ingredient ${ingredient} not found`)
        return this.liquids[ingredient].dispenseDuration(amount)
    }

    // Perform a dispense of an ingredient
    async dispense(ingredient, amount) {
        if (!ingredient in this.liquids) return Logging.log(`ingredient ${ingredient} not found`)
        await this.liquids[ingredient].dispense(amount)
    }

    async performStep(step) {
        // Dispense all the ingredients required
        const performedSteps = step.ingredients.map(async (ingredient) => {
            await this.dispense(ingredient.name, ingredient.amount)
        })
        await Promise.all(performedSteps)
            .then((values) => {
                Logging.log('- - - - - Finished step - - - - - - - -')
            })
    }

    // Estimate time to dispense for step
    performStepDuration(step) {
        return Math.max(...step.ingredients.map((ingredient) => { // Find the longest duration in the step
            return this.dispenseDuration(ingredient.name, ingredient.amount)
        }))
    }

    // Estimate how long it'll take to dispense the drink
    makeDuration(recipe) {
        return recipe.steps.reduce((accum, step) => { // Add all the steps together
            return accum + this.performStepDuration(step)
        }, 0)
    }

    async make(recipe, cback) {
        for(let step of recipe.steps) {
            await this.performStep(step)
        }
        if (cback) cback()
        Logging.log('- - - - - - Finished making drink - - - - - - - ')
    }

    reloadIngredients() {
        this.liquids = {}
        this.setup(Config.get('liquids'))
        return true
    }
}

module.exports = Bartender
