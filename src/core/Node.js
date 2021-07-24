import Broadcaster from '../structs/Broadcaster'
import Config from './Config'
import LoggerFactory from './LoggerFactory'

class Node extends Broadcaster {

    logging = null

    /**
     * @protected
     * @type {Config}
     */
    config = null

    /**
     * 
     * @param {Config} [config] 
     */
    constructor(config = {}) {
        super()
        this.config = new Config(config)
        this.logging = new LoggerFactory(this.config.logReporters)
    }

    run() {

    }

    shutdown() {

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