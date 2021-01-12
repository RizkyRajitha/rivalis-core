class KVStorageAdapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initalize() {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise.<any>} 
     */
    save(namespace, key, value) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<any>}
     */
    get(namespace, key) {}

    /**
     * 
     * @param {string} namespace
     * @returns {Promise.<object>} 
     */
    getAll(namespace) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @param {number} timeMs
     * @returns {Promise.<any>} 
     */
    expire(namespace, key, timeMs) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<number>} 
     */
    ttl(namespace, key) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    persist(namespace, key) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {}
}

export default KVStorageAdapter