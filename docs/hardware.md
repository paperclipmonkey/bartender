# Hardware

The Bartender server runs on a Raspberry Pi or similar system with access to GPIO and I2C libraries.

## Components
* [Raspberry Pi Zero WH](https://thepihut.com/products/raspberry-pi-zero-wh-with-pre-soldered-header). A newer Pi might work better as the architecture of 1st gen Pi doesn't support newer Node.js versions.

* [SparkFun Servo pHAT for Raspberry Pi](https://shop.pimoroni.com/products/sparkfun-servo-phat-for-raspberry-pi). Control all the servos. Supports up to 8, but only 4 used in this version.

* [ModMyPi MCP23017 pHAT - 16 Channel I/O Expansion (Zero)
](https://thepihut.com/products/modmypi-mcp23017-phat-16-channel-io-expansion-zero?_pos=3&_sid=e4982bb09&_ss=r). More out of simplicity. This could be run just from the io pins on the board with a little modification.

* [8 relay board](https://www.banggood.com/BESTEP-8-Channel-3_3V-Relay-Module-Optocoupler-Driver-Relay-Control-Board-Low-Level-p-1355824.html?rmmds=myorder&cur_warehouse=CN). Later switched to two 4 relay board so they could sit either side of the cup holder.

* [360° 20KG Waterproof High Torque Metal Gear RC Servo Motor Car Helicopter Boat](https://www.banggood.com/360-20KG-Waterproof-High-Torque-Metal-Gear-RC-Servo-Motor-Car-Helicopter-Boat-p-1422504.html?rmmds=myorder&cur_warehouse=USA). After working through a number of smaller servos these were found to be torquey enough to turn and hold an optic.

* [DP-2 Series 06 Micro Water Pump](https://www.ebay.co.uk/itm/DC-12V-Large-Flow-Small-Diaphragm-Self-Priming-Pump-Water-suction-Pressure-Pump/254006650146?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649). These pumps are cheap and good. They pump any non carbonated liquid quite well.

* [PVC Tube Clear Plastic Hose 6mm ID](https://www.ebay.co.uk/itm/PVC-Tube-Clear-Plastic-Hose-Pipe-Food-Grade-Fish-Pond-Car-Aquariums-Air/222789645286?ssPageName=STRK%3AMEBIDX%3AIT&var=521641695749&_trksid=p2057872.m2749.l2649). Fits the pumps. Each liquid has its own pipe to the cup holder

* [5v momentary switch with LED](https://www.ebay.co.uk/itm/5V-9V-12V-24V-110V-220V-ON-OFF-LED-12mm-Metal-Button-Switch-Momentary-Latching/274480618059?ssPageName=STRK%3AMEBIDX%3AIT&var=574638241283&_trksid=p2057872.m2749.l2649). LED turns on when the pump is active. Also supports topping up the cup by pressing the button.