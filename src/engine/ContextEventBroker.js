import MessageBroker from '../utils/MessageBroker'

/**
 * @typedef ContextEvent
 * @property {string} key
 * @property {any} data
 */

/**
 * 
 * @extends {MessageBroker<ContextEvent>}
 */
 class InternalEventBroker extends MessageBroker {

    /**
     * 
     * @param {MessageBrokerAdapter} adapter 
     * @param {string} contextId
     */
    constructor(adapter, contextId) {
        super(adapter, contextId, 'internal-events')
    }

    /**
     * 
     * @protected
     * @param {ContextEvent} message
     * @returns {string} 
     */
    mapInput = message => JSON.stringify(message)

    /**
     * 
     * @protected
     * @param {string} message
     * @returns {ContextEvent} 
     */
    mapOutput = message => JSON.parse(message)

}

export default InternalEventBroker