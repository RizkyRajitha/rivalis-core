import Config from './Config'

class Node {

    /**
     * @private
     * @type {Config}
     */
    config = null

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.config = new Config(config)
    }

    async init() {
        Config.validate(this.config)
        await this.config.persistence.init()
        for (let reporter of this.config.reporters) {
            await reporter.init()
        }
        for (let transport of this.config.transports) {
            await transport.init()
        }
    }

    destroy() {

    }

    define() {

    }

    create() {

    }

    obtain() {

    }

    destroy() {

    }
}

export default Node