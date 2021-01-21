import KVStorageAdapter from './adapters/KVStorageAdapter'
import ListStorageAdapter from './adapters/ListStorageAdapter'
import MessagingAdapter from './adapters/MessagingAdapter'
import Connector from './Connector'


class Config {

    adapters = {
        
        /**
         * 
         * @type {KVStorageAdapter}
         */
        kvStorage: null,

        /**
         * 
         * @type {ListStorageAdapter}
         */
        listStorage: null,

        /**
         * 
         * @type {MessagingAdapter}
         */
        messaging: null

    }

    /**
     * 
     * @type {Array.<Connector>}
     */
    connectors = []

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {

        const { kvStorage, listStorage, messaging } = config.adapters || {}

        this.adapters.kvStorage = kvStorage || null
        this.adapters.listStorage = listStorage || null
        this.adapters.messaging = messaging || null
        this.connectors = config.connectors || []
    }


    validate() {
        if (this.adapters.kvStorage === null) {
            throw new Error('key value storage adapter is not registered')
        }

        if (!(this.adapters.kvStorage instanceof KVStorageAdapter)) {
            throw new Error('kvStorage must be an instance of KVStorageAdapter')
        }

        if (this.adapters.listStorage === null) {
            throw new Error('list storage is not registered')
        }

        if (!(this.adapters.listStorage instanceof ListStorageAdapter)) {
            throw new Error('listStorage must be an instance of ListStorageAdapter')
        }

        if (this.adapters.messaging === null) {
            throw new Error('messaging adapter is not registered')
        }

        if (!(this.adapters.messaging instanceof MessagingAdapter)) {
            throw new Error('messaging must be an instance of MessagingAdapter')
        }
        
        if (this.connectors.length === 0) {
            throw new Error('can not be started without registered connectors')
        } else {
            for (let connector of this.connectors) {
                if (!(connector instanceof Connector)) {
                    throw new Error('added connectors must be instances of Connector class')
                }
            }
        }
    }

}

export default Config