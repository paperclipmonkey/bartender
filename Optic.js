const Pump = require('./Pump.js')
const Servo = require('./Servos.js')
const Logging = require('./Logging.js')

const OPEN_TIME = 5000 // Hold open time waiting for optic to drain
const OPENING_TIME = 2000
const CLOSING_TIME = 1800
const OPENING_TORQUE = 0.7 // 0-1. Needs to be strong enough to move the optic 
const CLOSING_TORQUE = 0.4 // 0-1. Ensure we don't hit the stops

class Optic extends Pump {
    async dispense(amount) {
        Logging.log(`Dispensing ${amount}ml of ${this.name}`)
        await this.open()
        await this.delay(OPEN_TIME)
        await this.close()
    }

    // Estimate how long it'll take to dispense in ms
    dispenseDuration() {
        return (OPENING_TIME + OPEN_TIME + CLOSING_TIME)
    }
    
    // Open the Optic
    async open() {
        Logging.log(`Opening ${this.name}`)
        // Motor
        Servo.setDutyCycle(this.pin, OPENING_TORQUE)
        await this.delay(OPENING_TIME)
        Servo.setOff(this.pin)
        Logging.log(`Opened ${this.name}`)
    }

    // Close the Optic
    async close() {
        Logging.log(`Closing ${this.name}`)
        // Motor up for 2 seconds
        Servo.setDutyCycle(this.pin, CLOSING_TORQUE)
        await this.delay(CLOSING_TIME)
        Servo.setOff(this.pin)
        Logging.log(`Closed ${this.name}`)
    }
}

module.exports = Optic