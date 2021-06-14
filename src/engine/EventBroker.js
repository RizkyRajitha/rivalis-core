import MessageBrokerAdapter from '../adapters/MessageBrokerAdapter'
import MessageBroker from '../utils/MessageBroker'
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

    /**
     * 
     * @protected
     * @param {Event} message
     * @returns {string} 
     */
    mapInput = message => Event.stringify(message) 

    /**
     * 
     * @protected
     * @param {string} message
     * @returns {Event} 
     */
    mapOutput = message => Event.parse(message)

}

export default EventBroker