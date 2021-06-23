import MessageBrokerAdapter from '../interfaces/MessageBrokerAdapter'
import MessageBroker from '../structs/MessageBroker'

class NodeEventBroker extends MessageBroker {

    /**
     * 
     * @param {MessageBrokerAdapter} adapter 
     */
    constructor(adapter) {
        super(adapter, 'node', 'events')
    }

}

export default NodeEventBroker