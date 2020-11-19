const Logging= require('./Logging.js')

const ML_PER_S = 25;

class Pump {
    constructor(name, pin) {
        this.name = name;
        this.pin = pin;
    }

    async dispense(amount) {
        Logging.log(`Dispensing ${amount}ml of ${this.name}`);
        // Turn on motor
        await this.delay((amount / Pump.ML_PER_S) * 1000); // Stop
        // Turn off motor
        Logging.log(`Done dispensing ${this.name}`);
    }

    // Estimate how long it'll take to dispense in ms
    dispenseDuration(amount) {
        return (amount / Pump.ML_PER_S) * 1000
    }

    async delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}

module.exports = Pump;