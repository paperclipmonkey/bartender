const Pump = require('./Pump.js')
const Servo = require('./Servos.js')
const Logging = require('./Logging.js')

const VOLUME = 25
const REFILL_TIME = 2500 // Amount of time the optic takes to refill
const OPEN_TIME = 2500 // Hold open time waiting for optic to drain
const OPENING_TIME = 700 // Move from closed to open
const CLOSING_TIME = 300 // Move from open to closed
const OPENING_TORQUE = 0.8 // 0.5 - 1. Needs to be strong enough to move the optic 
const CLOSING_TORQUE = 0.01 // 0-0.5. Faster closes encourage the bubbles to float up

class Optic extends Pump {
    async dispense(amount) {
        Logging.log(`Dispensing ${amount}ml of ${this.name}`)
        const numDispenses = Math.floor(amount / VOLUME)
        console.log(numDispenses)
        for (let i = 0; i < numDispenses; i++) {
            await this.open()
            await this.delay(OPEN_TIME)
            await this.close()
            await this.delay(REFILL_TIME)
        }
    }

    // Estimate how long it'll take to dispense in ms
    dispenseDuration(amount) {
        return (OPENING_TIME + OPEN_TIME + CLOSING_TIME + REFILL_TIME) * Math.floor(amount / VOLUME)
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