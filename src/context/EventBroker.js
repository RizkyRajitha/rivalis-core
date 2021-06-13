import MessageBrokerAdapter from '../adapters/MessageBrokerAdapter'
import MessageBroker from '../interfaces/MessageBroker'
import Context from './Context'
import Event from './Event'

/**
 * 
 * @extends {MessageBroker<Event>}
 */
class EventBroker extends MessageBroker {

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @param {MessageBrokerAdapter} adapter 
     * @param {Context} context 
     */
    constructor(adapter, context) {
        super(adapter, context.id, 'events')
        this.context = context
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