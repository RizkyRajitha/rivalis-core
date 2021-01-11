import ProtocolManager from './core/ProtocolManager'
import ContextProvider from './core/ContextProvider'
import Options from './Options'

class Rivalis {

    /**
     * 
     * @private
     * @type {Options}
     */
    options = null

    /**
     * 
     * @type {ContextProvider}
     */
    contexts = null

    /**
     * 
     * @type {ProtocolManager}
     */
    protocols = null

    /**
     * 
     * @type {ActionManager}
     */
    actions = null

    /**
     * 
     * @param {Options} options 
     */
    constructor(options = {}) {
        this.options = new Options(options)
        this.contexts = new ContextProvider(this.options.adapters, this.actions)
        this.protocols = new ProtocolManager(this.contexts)
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    initalize() {
        return this.protocols.initialize().then(() => {
            return this.options.adapters.messaging.initalize()
        }).then(() => {
            return this.options.adapters.storage.initalize()
        })
    }
}

export default Rivalis