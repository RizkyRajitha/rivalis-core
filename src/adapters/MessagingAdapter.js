/**
 * @callback subscribeCallback
 * @param {any} message
 */

class MessagingAdapter {
    
    /**
     * 
     * @returns {Promise<boolean>}
     */
    initialize() {
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} channel 
     * @param {subscribeCallback} callback
     * @returns {Promise<boolean>}
     */
    subscribe(namespace, channel, callback) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} channel 
     * @returns {Promise<boolean>}
     */
    unsubscribe(namespace, channel) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} channel 
     * @param {any} data
     * @returns {Promise<boolean>}
     */
    publish(namespace, channel, data) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} data 
     * @returns {Promise<boolean>}
     */
    emit(namespace, data) {}

}

export default MessagingAdapter