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
    initialize() {}

    /**
     * subscribe to specific address for receiving messages
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener
     * @returns {Promise.<any>} 
     */
    subscribe(namespace, address, listener) {}
 
    /**
     * unsubscribe of already subscribed address
     * @param {string} namespace 
     * @param {string} address
     * @param {MessageListener} listener
     * @returns {Promise.<any>}
     */
    unsubscribe(namespace, address, listener) {}
 
    /**
     * publish message to an address
     * @param {string} namespace 
     * @param {string} address 
     * @param {string} message
     * @returns {Promise.<any>} 
     */
    publish(namespace, address, message) {}

}

export default MessageBrokerAdapter