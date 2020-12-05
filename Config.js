const fs = require('fs')

class Config {
    constructor() {
        this.config = this._loadConfig()
    }

    _loadConfig() {
        return require('./config.json')
    }

    // [optics:[], pumps:[]]
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