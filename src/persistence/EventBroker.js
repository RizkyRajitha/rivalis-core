import MessageBrokerAdapter from '../interfaces/MessageBrokerAdapter'
import MessageBroker from '../structs/MessageBroker'
import Event from '../core/Event'

/**
 * 
 * @extends {MessageBroker<Event>}
 */
class EventBroker extends MessageBroker {

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {MessageBrokerAdapter} adapter 
     * @param {string} contextId
     */
    constructor(adapter, contextId) {
        super(adapter, contextId, 'events')
    }

    /**
     * @private
     * @param {Event} message 
     * @returns {string}
     */
    mapInput = message => Event.stringify(message)

    /**
     * @private
     * @param {string} message 
     * @returns {Event}
     */
    mapOutput = message => Event.parse(message)
}

export default EventBroker