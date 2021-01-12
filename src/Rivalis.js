import Config from './Config'
import ActionHandlerRepository from './core/ActionHandlerRepository'
import ContextRepository from './core/ContextRepository'

class Rivalis {

    /**
     * 
     * @type {ActionHandlerRepository}
     */
    actions = null

    /**
     * 
     * @type {ContextRepository}
     */
    contexts = null

    /**
     * 
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
        this.actions = new ActionHandlerRepository(this)
        this.contexts = new ContextRepository(this)
    }

    run() {

    }
}

export default Rivalis