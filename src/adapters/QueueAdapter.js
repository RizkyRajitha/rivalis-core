class QueueAdapter {
    
    /**
     * @returns {Promise<boolean>}
     */
    initialize() {}

    /**
     * 
     * @param {string} namespace
     * @param {any} data 
     * @returns {Promise<boolean>} 
     */
    enqueue(namespace, data) {}

    /**
     * 
     * @param {string} namespace
     * @returns {Promise<any>}
     */
    dequeue(namespace) {}

    /**
     * 
     * @param {string} namespace 
     * @param {number} offset 
     * @param {number} limit 
     * @returns {Promise<Array.<any>>}
     */
    get(namespace, offset = 0, limit = -1) {}

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<any>}
     */
    getLast(namespace) {}

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<any>}
     */
    getFirst(namespace) {}

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<boolean>}
     */
    clear(namespace) {}

}

export default QueueAdapter