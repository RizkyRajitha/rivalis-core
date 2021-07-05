import Adapter from '../interfaces/Adapter'
import ContextStorage from './ContextStorage'
import NodeEventBroker from './NodeEventBroker'

class NodeSync {

    /**
     * @type {ContextStorage}
     */
    contexts = null

    /**
     * @type {NodeEventBroker}
     */
    events = null

    /**
     * @type {Adapter}
     */
    adapter = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {Adapter} adapter 
     */
    constructor(adapter) {
        this.adapter = adapter
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

export default NodeSync