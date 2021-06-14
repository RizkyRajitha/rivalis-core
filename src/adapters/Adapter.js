import LoggingAdapter from './LoggingAdapter'
import MessageBrokerAdapter from './MessageBrokerAdapter'
import SharedStorageAdapter from './SharedStorageAdapter'

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
    getLoggingAdapter() {}

    /**
     * 
     * @returns {SharedStorageAdapter}
     */
    getSharedStorageAdapter() {}

    /**
     * 
     * @returns {MessageBrokerAdapter}
     */
    getMessageBrokerAdapter() {}

}

export default Adapter