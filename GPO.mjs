// General purpose _Output_

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import Config from './Config.mjs'

const ENABLED = Config.get('general.GPO')
let MCP23017

if (ENABLED) {
    const MCP23017 = require('node-mcp23017')
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
            device: '/dev/i2c-1', // '/dev/i2c-1' on model B | '/dev/i2c-0' on model A
            debug: true //default: false
        }
        this.driver = this.setup()
    }
    
    setup() {
        if (!ENABLED) return
        const mcp = new MCP23017({
            address: 0x20, //default: 0x20
            device: '/dev/i2c-1', // '/dev/i2c-1' on model B | '/dev/i2c-0' on model A
            debug: true //default: false
        });

        //set all GPIOS to be OUTPUTS
        for (var i = 0; i < 16; i++) {
            mcp.pinMode(i, mcp.OUTPUT)
            //mcp.pinMode(i, mcp.INPUT); //if you want them to be inputs
            //mcp.pinMode(i, mcp.INPUT_PULLUP); //if you want them to be pullup inputs
        }
    }

    setPin(pin, value) {
        if (!ENABLED) return
        mcp.digitalWrite(pin, value ? mcp.HIGH : mcp.LOW) //set GPIO A Pin 0 to state HIGH
    }
}

const gpo = new GPO()
export default gpo