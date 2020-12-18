import StorageAdapter from "../adapters/StorageAdapter"

class Storage {
    
    /** @private */
    PREFIX = '_storage@rivalis:'

    /**
     * @private
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
        this.namespace = this.PREFIX + namespace
        this.storageAdapter = storageAdapter
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise<boolean>} 
     */
    set(key, value) {
        return this.storageAdapter.set(this.namespace, key, value)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise<any>}
     */
    get(key) {
        return this.storageAdapter.get(this.namespace, key)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise<boolean>} 
     */
    delete(key) {
        return this.storageAdapter.delete(this.namespace, key)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise<boolean>} 
     */
    exist(key) {
        return this.storageAdapter.exist(this.namespace, key)
    }

    /**
     * 
     * @returns {Promise<Object>} 
     */
    getAll() {
        return this.storageAdapter.getAll(this.namespace)
    }

    /**
     * 
     * @returns {Promise<boolean>} 
     */
    deleteAll() {
        return this.storageAdapter.deleteAll(this.namespace)
    }

}

export default Storage