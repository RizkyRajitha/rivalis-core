class Adapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initalize() {}

    /**
     * subscribe to specific address for receiving messages
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener
     * @returns {Promise.<any>} 
     */
    subscribe(namespace, address, listener) {}

    /**
     * unsubscribe of already subscribed address
     * @param {string} namespace 
     * @param {string} address
     * @param {MessageListener} listener
     * @returns {Promise.<any>}
     */
    unsubscribe(namespace, address, listener) {}

    /**
     * publish message to ant address
     * @param {string} namespace 
     * @param {string} address 
     * @param {any} message
     * @returns {Promise.<any>} 
     */
    publish(namespace, address, message) {}

     /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise.<any>} 
     */
    set(namespace, key, value) {}

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
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {}

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
    getList(namespace, offset, limit) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    clearList(namespace) {}

}

export default Adapter