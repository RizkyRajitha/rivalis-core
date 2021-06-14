import Adapter from './Adapter'
import BasicLoggingAdapter from './BasicLoggingAdapter'
import InMemoryStorageAdapter from './InMemoryStorageAdapter'
import LocalMessageBrokerAdapter from './LocalMessageBrokerAdapter'
import LoggingAdapter from './LoggingAdapter'
import MessageBrokerAdapter from './MessageBrokerAdapter'
import SharedStorageAdapter from './SharedStorageAdapter'

class LocalAdapter extends Adapter {

    /**
     * 
     * @private
     * @type {LoggingAdapter}
     */
    loggingAdapter = new BasicLoggingAdapter()

    /**
     * 
     * @private
     * @type {SharedStorageAdapter}
     */
    sharedStorageAdapter = new InMemoryStorageAdapter()

    /**
     * 
     * @private
     * @type {MessageBrokerAdapter}
     */
    messageBrokerAdapter = new LocalMessageBrokerAdapter()

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        return this.loggingAdapter.initialize().then(() => {
            return this.sharedStorageAdapter.initialize()
        }).then(() => {
            return this.messageBrokerAdapter.initialize()
        })
    }

    /**
     * 
     * @returns {LoggingAdapter}
     */
    getLoggingAdapter() {
        return this.loggingAdapter
    }

    /**
     * 
     * @returns {SharedStorageAdapter}
     */
     getSharedStorageAdapter() {
        return this.sharedStorageAdapter
    }

    /**
     * 
     * @returns {MessageBrokerAdapter}
     */
    getMessageBrokerAdapter() {
        return this.messageBrokerAdapter
    }
    

}

export default LocalAdapter