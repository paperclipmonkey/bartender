// General purpose _Output_
const ENABLED = process.env.GPO === 'true'
let MCP23017


if (ENABLED) {
    MCP23017 = require('./mcp23017')
}

let mcp

const pin = 0;

// var k = new MCP23017(1, 0x20);
// k.setPinDirection(pin, 0);// Set pin 0 as output
// k.writePin(pin, 1); // Turn pin 1 on.
// k.setPinPullup(pin, 0);

let pinState = true;

async function loop() {
    while (true) {
        console.log("Setting pin to: " + pinState)
        pinState = !pinState;
        k.writePin(pin, pinState ? 0 : 1); // Turn pin 1 on.
        await delay(1000);
    }
}

/*
  By default all GPIOs are defined as INPUTS.
  You can set them all the be OUTPUTs by using the pinMode-Methode (see below),
  You can also disable the debug option by simply not passing it to the constructor
  or by setting it to false
*/

class GPO {
    constructor() {
        this.options = {
            address: 0x20, //default: 0x20
            device: 1, // '/dev/i2c-1' on model B | '/dev/i2c-0' on model A
        }
        this.driver = this.setup()
    }
    
    setup() {
        if (!ENABLED) return
        mcp = new MCP23017(this.options.device, this.options.address);

        //set all GPIOS to be OUTPUTS
        for (let pin = 0; pin < 16; pin++) {
            mcp.setPinDirection(pin, 0) // Output
            mcp.setPinPullup(pin, 0)
            mcp.writePin(pin, 1) // Turn pin off.
        }
    }

    setPin(pin, value) {
        if (!ENABLED) return
        mcp.writePin(pin, value ? 0 : 1)
    }
}

const gpo = new GPO()
module.exports = gpo