// https://www.npmjs.com/package/pca9685
import Logging from './Logging.mjs'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import Config from './Config.mjs'
const ENABLED = Config.get('general.GPO')

if(ENABLED) {
    let i2cBus = require("i2c-bus")
    let Pca9685Driver = require("pca9685").Pca9685Driver
}

class Servos {
    constructor() {
        if(ENABLED) {
            this.options = {
                i2c: i2cBus.openSync(1),
                address: 0x40,
                frequency: 50,
                debug: false
            }
            this.driver = this.setup()
        }
    }
    
    setup() {
        return new Pca9685Driver(this.options, function(err) {
            if (err) {
                Logging.error("Error initializing PCA9685")
                process.exit(-1)
            }
            Logging.log("Initialization done")
        })
    }
    setOff(channel) {
        if (channel < 0 || channel > 12) throw new Error('Channel not known')
        if (!ENABLED) return
        this.driver.channelOff(channel)
    }

    setOn(channel) {
        if (channel < 0 || channel > 12) throw new Error('Channel not known')
        if (!ENABLED) return
        // Turn on channel 3 (100% power)
        this.driver.channelOn(channel)
    }

    setDutyCycle(channel, amount) {
        if (!ENABLED) return
        if (amount < 0 || amount > 1) throw new Error('Duty cycle between 0 - 1')
        if (channel < 0 || channel > 12) throw new Error('Channel not known')
        // Set the duty cycle to 25% for channel 8
        this.driver.setDutyCycle(8, amount)
    }
}

const servo = new Servos()
export default servo