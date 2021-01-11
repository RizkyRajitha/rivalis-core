
class KeyValueStore {

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
     * @returns {Promise.<any>} 
     */
    expire(namespace, key) {}

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

class ListStore {

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
     * @returns {Promise.<any>}
     */
    shift(namespace) {}

    /**
     * 
     * @param {string} namespace 
     * @param {any} value 
     * @returns {Promise.<any>}
     */
    unshift(namespace, value) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<Array.<any>>}
     */
    getAll(namespace) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    delete(namespace) {}
}

class StorageAdapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initalize() {}

    /**
     * 
     * @type {KeyValueStore}
     */
    keyValue = new StorageAdapter.KeyValueStore()

    /**
     * 
     * @type {ListStore}
     */
    list = new StorageAdapter.ListStore()

}

/** @typedef */
StorageAdapter.KeyValueStore = KeyValueStore

/** @typedef */
StorageAdapter.ListStore = ListStore

export default StorageAdapter