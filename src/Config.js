import InMemoryKVStorageAdapter from './adapters/inmemory/InMemoryKVStorageAdapter'
import InMemoryListStorageAdapter from './adapters/inmemory/InMemoryListStorageAdapter'
import InMemoryMessagingAdapter from './adapters/inmemory/InMemoryMessagingAdapter'
import KVStorageAdapter from './adapters/KVStorageAdapter'
import ListStorageAdapter from './adapters/ListStorageAdapter'
import MessagingAdapter from './adapters/MessagingAdapter'
import Protocol from './Protocol'


class Config {

    adapters = {
        
        /**
         * 
         * @type {KVStorageAdapter}
         */
        kvStorage: new InMemoryKVStorageAdapter(),

        /**
         * 
         * @type {ListStorageAdapter}
         */
        listStorage: new InMemoryListStorageAdapter(),

        /**
         * 
         * @type {MessagingAdapter}
         */
        messaging: new InMemoryMessagingAdapter()

    }

    /**
     * 
     * @type {Array.<Protocol>}
     */
    protocols = []

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.protocols = config.protocols
        // TODO: implement validation
    }

}

export default Config