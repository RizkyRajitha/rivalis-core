import StorageAdapter from '../adapters/StorageAdapter'

class EventStorage {

    /**
     * 
     * @private
     * @readonly
     * @type {string}
     */
    namespace = null

    /**
     * @private
     * @type {StorageAdapter}
     */
    storageAdapter = null


    /**
     * 
     * @param {string} namespace 
     * @param {StorageAdapter} storageAdapter 
     */
    constructor(namespace, storageAdapter) {
        this.namespace = namespace
        this.storageAdapter = storageAdapter

    }

    save(event) {
        return this.storageAdapter.list.push(this.namespace, event)
    }

    getAll() {
        return this.storageAdapter.list.getAll(this.namespace)
    }
}

export default EventStorage