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
    initialize() {
        return Promise.reject(new Error('Adapter#initialize not implemented'))
    }

    /**
     * 
     * @returns {SharedStorageAdapter}
     */
    getSharedStorage() {
        throw new Error('Adapter#getSharedStorage not implemented')
    }

    /**
     * 
     * @returns {MessageBrokerAdapter}
     */
    getMessageBroker() {
        throw new Error('Adapter#getMessageBroker not implemented')
    }

}

export default Adapter