import MessageBrokerAdapter from '../interfaces/MessageBrokerAdapter'
import MessageBroker from '../structs/MessageBroker'

class NodeEventBroker extends MessageBroker {

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {MessageBrokerAdapter} adapter 
     */
    constructor(adapter) {
        super(adapter, 'node', 'events')
    }

}

export default NodeEventBroker