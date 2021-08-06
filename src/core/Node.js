<<<<<<< HEAD
import Config from './Config'

class Node {
=======
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
>>>>>>> origin/dev

    /**
     * 
     * @param {Config} config 
     */
<<<<<<< HEAD
    constructor(config) {
        
=======
    constructor(config = {}) {
        super()
        this.config = new Config(config)
        this.logging = new LoggerFactory(this.config.logReporters)
    }

    run() {

>>>>>>> origin/dev
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