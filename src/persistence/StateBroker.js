import MessageBroker from '../structs/MessageBroker'
/**
 * 
 * @extends {MessageBroker<Object.<string,any>>}
 */
 class StateBroker extends MessageBroker {

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
        super(adapter, contextId, 'state')
    }
}

export default StateBroker