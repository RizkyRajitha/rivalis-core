class StorageAdapter {

    /**
     * 
     * @returns {Promise<boolean>}
     */
    initialize() {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise<boolean>} 
     */
    set(namespace, key, value) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise<any>}
     */
    get(namespace, key) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise<boolean>} 
     */
    delete(namespace, key) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise<boolean>} 
     */
    exist(namespace, key) {}

    /**
     * 
     * @param {string} namespace
     * @returns {Promise<Object>} 
     */
    getAll(namespace) {}

    /**
     * 
     * @param {string} namespace
     * @returns {Promise<boolean>} 
     */
    deleteAll(namespace) {}

}

export default StorageAdapter