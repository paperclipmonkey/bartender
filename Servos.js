const Logging= require('./Logging.js')

const ENABLED = process.env.SERVOS === true
let i2cBus
let Pca9685Driver

// We can't load these packages on a !pi platform
// This allows for development on a different machine
if(ENABLED) {
    i2cBus = require("i2c-bus")
    Pca9685Driver = require("pca9685").Pca9685Driver
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
        this.driver.setPulseLength(channel, 1500) // 1500 === off
    }

    setOn(channel) {
        if (channel < 0 || channel > 12) throw new Error('Channel not known')
        if (!ENABLED) return
        // Turn on channel 3 (100% power)
        this.driver.channelOn(channel)
    }

    // 0.5 = stop
    // 0 = full one way
    // 1 = full other way
    setDutyCycle(channel, amount) {
        if (!ENABLED) return
        if (amount < 0 || amount > 1) throw new Error('Duty cycle between 0 - 1')
        if (channel < 0 || channel > 12) throw new Error('Channel not known')
        const pulseLength = 1000 + (amount * 1000)
        this.driver.setPulseLength(channel, pulseLength)
    }
}

const servo = new Servos()
module.exports = servo