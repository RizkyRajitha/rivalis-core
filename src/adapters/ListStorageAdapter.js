class ListStorageAdapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initalize() {}

    /**
     * 
     * @param {string} namespace 
     * @param {any} value 
     * @returns {Promise.<any>}
     */
    push(namespace, value) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    pop(namespace) {}

    /**
     * 
     * @param {string} namespace
     * @param {number} offset
     * @param {number} limit 
     * @returns {Promise.<Array.<any>>}
     */
    getAll(namespace, offset, limit) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    delete(namespace) {}
}

export default ListStorageAdapter