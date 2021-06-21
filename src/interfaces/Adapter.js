import MessageBrokerAdapter from './MessageBrokerAdapter'
import SharedStorageAdapter from './SharedStorageAdapter'

/**
 * @interface Adapter
 * 
 * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
 * @author Daniel Kalevski
 * @since 0.5.0
 * 
 * // TODO: write description
 * 
 */
class Adapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {/** TODO: throw error **/ }

    /**
     * 
     * @returns {SharedStorageAdapter}
     */
    getSharedStorage() {}

    /**
     * 
     * @returns {MessageBrokerAdapter}
     */
    getMessageBroker() {}

}

export default Adapter