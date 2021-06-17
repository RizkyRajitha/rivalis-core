import LoggingAdapter from './LoggingAdapter'
import MessageBrokerAdapter from './MessageBrokerAdapter'
import SharedStorageAdapter from './SharedStorageAdapter'

/**
 * @interface Adapter
 */
class Adapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {}

    /**
     * 
     * @returns {LoggingAdapter}
     */
    getLogger() {}

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