class Logging {
    log() {
        console.log(...arguments)
    }

    error() {
        console.error(...arguments)
    }
}

const logging = new Logging()

export default logging;
