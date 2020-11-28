const Pump = require('./Pump.js')
const Servo = require('./Servos.js')
const Logging = require('./Logging.js')

const OPEN_TIME = 5000
const OPENING_TIME = 2000
const CLOSING_TIME = 1800
const OPENING_TORQUE = 0.7 // OUT OF 1
const CLOSING_TORQUE = 0.4 // OUT OF 1 

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
    
    async open() {
        Logging.log(`Opening ${this.name}`)
        // Motor
        // Servo.setDutyCycle(this.pin, OPENING_TORQUE)
        Servo.setDutyCycle(this.pin, OPENING_TORQUE)
        await this.delay(OPENING_TIME)
        Servo.setOff(this.pin)
        Logging.log(`Opened ${this.name}`)
    }

    async close() {
        Logging.log(`Closing ${this.name}`)
        // Motor up for 2 seconds
        // Servo.setDutyCycle(this.pin, CLOSING_TORQUE)
        Servo.setDutyCycle(this.pin, CLOSING_TORQUE)
        await this.delay(CLOSING_TIME) // Stop
        Servo.setOff(this.pin)
        Logging.log(`Closed ${this.name}`)
    }
}

module.exports = Optic