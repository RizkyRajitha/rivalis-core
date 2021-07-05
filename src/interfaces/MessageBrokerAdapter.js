import Exception from '../core/Exception'

/**
 * @callback MessageListener
 * @param {string} message
 */

/**
 * @interface MessageBrokerAdapter
 * 
 * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
 * @author Daniel Kalevski
 * @since 0.5.0
 * 
 * // TODO: write description
 * 
 */
class MessageBrokerAdapter {

    /**
     * 
     * @returns {Promise.<void>}
     */
    initialize() {
        return Promise.reject(new Exception('MessageBrokerAdapter#initialize is not implemented'))
    }

    /**
     * subscribe to specific address for receiving messages
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener
     * @returns {Promise.<void>} 
     */
    subscribe(namespace, address, listener) {
        return Promise.reject(new Exception('MessageBrokerAdapter#subscribe is not implemented'))
    }
 
    /**
     * unsubscribe of already subscribed address
     * @param {string} namespace 
     * @param {string} address
     * @param {MessageListener} listener
     * @returns {Promise.<void>}
     */
    unsubscribe(namespace, address, listener) {
        return Promise.reject(new Exception('MessageBrokerAdapter#unsubscribe is not implemented'))
    }
 
    /**
     * publish message to an address
     * @param {string} namespace 
     * @param {string} address 
     * @param {string} message
     * @returns {Promise.<void>} 
     */
    publish(namespace, address, message) {
        return Promise.reject(new Exception('MessageBrokerAdapter#publish is not implemented'))
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        return Promise.reject(new Exception('MessageBrokerAdapter#dispose is not implemented'))
    }

}

export default MessageBrokerAdapter