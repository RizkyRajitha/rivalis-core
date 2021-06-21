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
     * @returns {Promise.<any>}
     */
    initialize() {
        return Promise.reject(new Error('MessageBrokerAdapter#initialize not implemented'))
    }

    /**
     * subscribe to specific address for receiving messages
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener
     * @returns {Promise.<any>} 
     */
    subscribe(namespace, address, listener) {
        return Promise.reject(new Error('MessageBrokerAdapter#subscribe not implemented'))
    }
 
    /**
     * unsubscribe of already subscribed address
     * @param {string} namespace 
     * @param {string} address
     * @param {MessageListener} listener
     * @returns {Promise.<any>}
     */
    unsubscribe(namespace, address, listener) {
        return Promise.reject(new Error('MessageBrokerAdapter#unsubscribe not implemented'))
    }
 
    /**
     * publish message to an address
     * @param {string} namespace 
     * @param {string} address 
     * @param {string} message
     * @returns {Promise.<any>} 
     */
    publish(namespace, address, message) {
        return Promise.reject(new Error('MessageBrokerAdapter#publish not implemented'))
    }

}

export default MessageBrokerAdapter