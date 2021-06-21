import Adapter from '../interfaces/Adapter'
import NodePersistence from '../persistence/NodePersistence'

class Node {

    /**
     * @private
     * @type {NodePersistence}
     */
    persistence = null

    /**
     * @private
     * @type {Adapter}
     */
    adapter = null

    /**
     * 
     * @param {Adapter} adapter 
     */
    constructor(adapter) {
        
    }

    run() {
        return this.adapter.initialize().then(() => {
            this.persistence = new NodePersistence(this.adapter)
            return this.persistence.initialize()
        })
    }

    shutdown() {
        // 1. dispose protocols, dispose contexts, dispose persistence, dispose adapter
    }

    create(id,) {
        this.persistence.contexts.savenx()
    }

    destroy() {

    }

    obtain(contextId) {

    }

    leave(context) {

    }

    define(type, stage) {

    }

    enable(protocol) {

    }

}

export default Node