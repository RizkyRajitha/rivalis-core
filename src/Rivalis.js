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
        return this.config.adapters.kvStorage.initalize().then(() => {
            this.config.adapters.listStorage.initalize()
        }).then(() => {
            this.config.adapters.messaging.initalize()
        }).then(() => {
            const promises = []
            for (let protocol of this.config.protocols) {
                const promise = protocol.initalize(this.contexts)
                promises.push(promise)
            }
            return Promise.all(promises)
        })
    }
}

export default Rivalis