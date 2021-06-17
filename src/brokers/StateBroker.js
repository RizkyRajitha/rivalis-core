import MessageBroker from '../structs/MessageBroker'
import State from '../models/State'
/**
 * 
 * @extends {MessageBroker<State>}
 */
 class StateBroker extends MessageBroker {

    /**
     * 
     * @param {MessageBrokerAdapter} adapter 
     * @param {string} contextId
     */
    constructor(adapter, contextId) {
        super(adapter, contextId, 'state')
    }
}

export default StateBroker