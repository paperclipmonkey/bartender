import Optic from './Optic.mjs'
import Fluid from './Pump.mjs'
import Logging from './Logging.mjs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const initialConfig = require('./initial-config.json')

class Bartender {
    constructor() {
        this.OPTICS = {}
        this.FLUIDS = {}
        this.setup(initialConfig)
    }

    setup(config) {
        for(const name of Object.keys(config.OPTICS)) {
            this.OPTICS[name] = new Optic(name, config.OPTICS[name].pin)
        }
        for (const name of Object.keys(config.FLUIDS)) {
            this.FLUIDS[name] = new Fluid(name, config.FLUIDS[name].pin)
        }
    }

    dispenseDuration(ingredient, amount) {
        // Search optics and fluids for ingredient
        if (ingredient in this.OPTICS) {
            return this.OPTICS[ingredient].dispenseDuration(amount)
        } else if (ingredient in this.FLUIDS) {
            return this.FLUIDS[ingredient].dispenseDuration(amount)
        }
    }

    async dispense(ingredient, amount) {
        // Search optics and fluids for ingredient
        if(ingredient in this.OPTICS) {
            await this.OPTICS[ingredient].dispense(amount)
        } else if (ingredient in this.FLUIDS) {
            await this.FLUIDS[ingredient].dispense(amount)
        } else {
           return Logging.log(`ingredient ${ingredient} not found`)
        }
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
        return Math.max(...step.ingredients.map((ingredient) => {
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

    getIngredients() {
        return [
            ...Object.keys(this.OPTICS),
            ...Object.keys(this.FLUIDS)
        ]
    }
}

export default Bartender
