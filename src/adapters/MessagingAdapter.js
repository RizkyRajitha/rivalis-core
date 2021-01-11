/**
 * @callback MessageListener
 * @param {any} message
 */

class MessagingAdapter {

    /**
     * Initalizing connection to messaging server
     * @returns {Promise.<any>}
     */
    initalize() {}

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
     * publish message to ant address
     * @param {string} namespace 
     * @param {string} address 
     * @param {any} message
     * @returns {Promise.<any>} 
     */
    publish(namespace, address, message) {}

}

export default MessagingAdapter