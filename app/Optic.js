const Pump = require('./Pump.js')
const Servo = require('./Servos.js')
const Logging = require('./Logging.js')

const VOLUME = 25 // ml of the optic
const REFILL_TIME = 3000 // ms optic takes to refill
const OPEN_TIME = 2800 // ms optic to drain
const OPENING_TIME = 400 // ms move from closed to open
const CLOSING_TIME = 275 // ms move from open to closed
const OPENING_TORQUE = 0.0 // 0 - 0.5. Needs to be strong enough to move the optic 
const CLOSING_TORQUE = 1 // 0.5 - 1. Faster closes encourage the bubbles to float up

class Optic extends Pump {
    async dispense(amount) {
        Logging.log(`Dispensing ${amount}ml of ${this.name}`)
        const numDispenses = Math.floor(amount / VOLUME)
        // Open the optic x times
        for (let i = 0; i < numDispenses; i++) {
            await this.dispenseCycle()
        }
    }

    async dispenseCycle() {
        await this.open()
        await this.delay(OPEN_TIME)
        await this.close()
        await this.delay(REFILL_TIME)
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
    
    // Force air out of the optic?
    async wiggle() {
        await this.delay(1000)
        Servo.setDutyCycle(this.pin, 0)
        await this.delay(250)
        Servo.setDutyCycle(this.pin, 1)
        await this.delay(150)
        Servo.setOff(this.pin)
    }
}

module.exports = Optic