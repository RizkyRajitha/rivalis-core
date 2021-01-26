import Adapter from '../presence/Presence'
import StageRegister from '../stages/StageRegister'
import ContextProvider from '../contexts/ContextProvider'
import Config from './Config'
import { Signal } from 'signals'

class Server {

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
     * @private
     * @type {Signal.<any>}
     */
    onInit = null

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.config = new Config(config)
        this.onInit = new Signal()
        this.stages = new StageRegister()
        this.contexts = new ContextProvider(this.onInit, this.config)
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    initalize() {
        
    }

}

export default Server