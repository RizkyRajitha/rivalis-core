import StageRegister from '../stages/StageRegister'
import ContextProvider from '../contexts/ContextProvider'
import Config from './Config'

class Rivalis {

    /**
     * 
     * @type {StageRegister}
     */
    stages = null

    /**
     * 
     * @type {ContextProvider}
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
        this.stages = new StageRegister()
        this.contexts = new ContextProvider(this.config, this.stages)
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        return this.config.initialize().then(() => {
            return this.contexts.initialize()
        }).then(() => {
            let promises = []
            for (let protocol of this.config.protocols) {
                protocol.contextProvider = this.contexts
                promises.push(protocol.initialize())
            }
            return Promise.all(promises).then(() => null)
        })
    }

}

export default Rivalis