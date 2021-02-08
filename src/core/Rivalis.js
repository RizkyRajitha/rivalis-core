import StageRegister from '../stages/StageRegister'
import ContextProvider from '../contexts/ContextProvider'
import Config from './Config'
import { Signal } from 'signals'

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
        return this.config.adapter.initialize().then(() => this.contexts.initialize())
    }

}

export default Rivalis