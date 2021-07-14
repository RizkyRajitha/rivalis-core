import Core from './Core'
import Config from './Config'
import ContextSystem from '../contexts/ContextSystem'

class Node extends Core {

    /**
     * @type {ContextSystem}
     */
    contexts = null

    /**
     * 
     * @param {Config} [config] 
     */
    constructor(config = {}) {
        super(config)
    }

    run() {
        
    }

    shutdown() {

    }

}
let r = new Node()

export default Node