import Pump from './Pump.mjs'
import Servo from './Servos.mjs'
import Logging from './Logging.mjs'

class Optic extends Pump {

    static OPEN_TIME = 5000
    static OPENING_TIME = 2000
    static CLOSING_TIME = 1800
    static OPENING_TORQUE = 0.7 // OUT OF 1
    static CLOSING_TORQUE = 0.4 // OUT OF 1

    async dispense(amount) {
        Logging.log(`Dispensing ${amount}ml of ${this.name}`)
        await this.open()
        await this.delay(Optic.OPEN_TIME)
        await this.close()
    }

    // Estimate how long it'll take to dispense in ms
    dispenseDuration() {
        return (Optic.OPENING_TIME + Optic.OPEN_TIME + Optic.CLOSING_TIME)
    }
    
    async open() {
        Logging.log(`Opening ${this.name}`)
        // Motor
        Servo.setDutyCycle(this.pin, Optic.OPENING_TORQUE)
        await this.delay(Optic.OPENING_TIME)
        Servo.setOff(this.pin)
        Logging.log(`Opened ${this.name}`)
    }

    async close() {
        Logging.log(`Closing ${this.name}`)
        // Motor up for 2 seconds
        Servo.setDutyCycle(this.pin, Optic.CLOSING_TORQUE)
        await this.delay(Optic.CLOSING_TIME) // Stop
        Servo.setOff(this.pin)
        Logging.log(`Closed ${this.name}`)
    }
}

export default Optic