import MessageBrokerAdapter from '../interfaces/MessageBrokerAdapter'
import MessageBroker from '../structs/MessageBroker'
import Event from '../core/Event'

/**
 * 
 * @extends {MessageBroker<Event>}
 */
class EventBroker extends MessageBroker {

    /**
     * 
     * @param {MessageBrokerAdapter} adapter 
     * @param {string} contextId
     */
    constructor(adapter, contextId) {
        super(adapter, contextId, 'events')
    }
}

export default EventBroker