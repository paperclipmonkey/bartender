const fs = require('fs')
/**
 * Keep track of optics and pumps configured.
 * Save the config out to a json file for consistency between startups
 */
class Config {
    constructor() {
        this.config = this._loadConfig()
    }

    _loadConfig() {
        return require('../config/config.json')
    }

    getConfig() {
        return this.config
    }

    setConfig(config) {
        this.config = config
        this._saveConfig()
    }

    _saveConfig() {
        let jsonString = JSON.stringify(this.config, null, 2)
        fs.writeFileSync('./config.json', jsonString)
    }

    // Merge optics and pumps together for list of all current ingredients
    getAllAvailable() {
        return [...this.config.optics, ...this.config.pumps]
    }
}

const config = new Config()

module.exports = config