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
     * @returns {Promise.<void>}
     */
    initialize() {
        return Promise.reject(new Error('Adapter#initialize is not implemented'))
    }

    /**
     * 
     * @returns {SharedStorageAdapter}
     */
    getSharedStorage() {
        throw new Error('Adapter#getSharedStorage is not implemented')
    }

    /**
     * 
     * @returns {MessageBrokerAdapter}
     */
    getMessageBroker() {
        throw new Error('Adapter#getMessageBroker is not implemented')
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        throw new Error('Adapter#dispose not is implemented')
    }

}

export default Adapter