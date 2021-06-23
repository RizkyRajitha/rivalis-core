import Adapter from '../interfaces/Adapter'
import ContextStorage from './ContextStorage'
import NodeEventBroker from './NodeEventBroker'

class NodePersistence {

    /**
     * @type {ContextStorage}
     */
    contexts = null

    /**
     * @type {NodeEventBroker}
     */
    events = null

    /**
     * 
     * @param {Adapter} adapter 
     */
    constructor(adapter) {
        this.contexts = new ContextStorage(adapter.getSharedStorage())
        this.events = new NodeEventBroker(adapter.getMessageBroker())
    }

    initialize() {
        return this.events.initialize()
    }

    dispose() {
        return this.events.dispose()
    }

}

export default NodePersistence