import Exception from '../helpers/Exception'
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
        return Promise.reject(new Exception('Adapter#initialize is not implemented', Exception.Code.INTERNAL))
    }

    /**
     * 
     * @returns {SharedStorageAdapter}
     */
    getSharedStorage() {
        throw new Exception('Adapter#getSharedStorage is not implemented', Exception.Code.INTERNAL)
    }

    /**
     * 
     * @returns {MessageBrokerAdapter}
     */
    getMessageBroker() {
        throw new Exception('Adapter#getMessageBroker is not implemented', Exception.Code.INTERNAL)
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        throw new Exception('Adapter#dispose not is implemented', Exception.Code.INTERNAL)
    }

}

export default Adapter