class Logging {
    log() {
        console.log(...arguments)
        if (this.func) this.func(...arguments)
    }

    error() {
        console.error(...arguments)
        if (this.func) this.func(...arguments)
    }
    
    registerListener(func) {
        this.func = func
    }
}

const logging = new Logging()

module.exports = logging
