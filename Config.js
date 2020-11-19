// const { createRequire }= require('module'
// const require = createRequire(import.meta.url)


class Config {
    constructor() {
        this.config = this.initialConfig()
    }

    initialConfig() {
        return require('./initial-config.json')
    }

    // Key property using dot notation (a.b.c)
    get(key) {
        return this.index(this.config, key)
    }

    // Set property using dot notation
    set(key, value) {
        return this.index(this.config, key, value)
    }

    // https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
    index(obj, is, value) {
        if (typeof is == 'string')
            return this.index(obj, is.split('.'), value);
        else if (is.length == 1 && value !== undefined)
            return obj[is[0]] = value;
        else if (is.length == 0)
            return obj;
        else
            return this.index(obj[is[0]], is.slice(1), value);
    }
}

const config = new Config()

module.exports = config