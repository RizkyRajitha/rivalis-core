import StorageAdapter from '../adapters/StorageAdapter'

class Storage {

    /**
     * 
     * @readonly
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * 
     * @private
     * @type {StorageAdapter}
     */
    storageAdapter = null

    /**
     * 
     * @param {StorageAdapter} storageAdapter 
     */
    constructor(namespace, storageAdapter) {
        this.namespace = namespace
        this.storageAdapter = storageAdapter
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise.<any>} 
     */
    save(key, value) {
        return this.storageAdapter.keyValue.save(this.namespace, key, value)
    }

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<any>}
     */
    get(key) {
        return this.storageAdapter.keyValue.get(this.namespace, key)
    }

    /**
     * 
     * @returns {Promise.<object>} 
     */
    getAll() {
        return this.storageAdapter.keyValue.getAll(this.namespace)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(key) {
        return this.storageAdapter.keyValue.exist(this.namespace, key)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    expire(key) {
        return this.storageAdapter.keyValue.expire(this.namespace, key)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise.<number>} 
     */
    ttl(key) {
        return this.storageAdapter.keyValue.ttl(this.namespace, key)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    persist(key) {
        return this.storageAdapter.keyValue.persist(this.namespace, key)
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(key) {
        return this.storageAdapter.keyValue.delete(this.namespace, key)
    }

    /**
     * 
     * @returns {Promise.<any>} 
     */
    clear() {
        return this.storageAdapter.keyValue.clear(this.namespace)
    }

}

export default Storage