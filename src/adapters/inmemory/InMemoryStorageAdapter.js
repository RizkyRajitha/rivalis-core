import StorageAdapter from '../StorageAdapter'


class InMemoryKeyValueStore extends StorageAdapter.KeyValueStore {
    
    data = {}
    
    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise.<any>} 
     */
    save(namespace, key, value) {
        this.checkNamespace(namespace)
        this.data[namespace][key] = value
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<any>}
     */
    get(namespace, key) {
        this.checkNamespace(namespace)
        return Promise.resolve(this.data[namespace][key] || null)
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise.<object>} 
     */
    getAll(namespace) {
        this.checkNamespace(namespace)
        return Promise.resolve(this.data[namespace])
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {
        this.checkNamespace(namespace)
        return Promise.resolve(typeof this.data[namespace][key] !== 'undefined')
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    expire(namespace, key) {
        // TODO: implement this
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<number>} 
     */
    ttl(namespace, key) {
        // TODO: implement this
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    persist(namespace, key) {
        // TODO: implement this
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {
        this.checkNamespace(namespace)
        delete this.data[namespace][key]
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {
        this.checkNamespace(namespace)
        this.data[namespace] = {}
        return Promise.resolve()
    }
    
    checkNamespace(namespace) {
        if (typeof this.data[namespace] === 'undefined') {
            this.data[namespace] = {}
        }
    }
}

class InMemoryListStore extends StorageAdapter.ListStore {
    
    data = {}

    /**
     * 
     * @param {string} namespace 
     * @param {any} value 
     * @returns {Promise.<any>}
     */
    push(namespace, value) {
        this.checkNamespace(namespace)
        this.data[namespace].push(value)
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    pop(namespace) {
        this.checkNamespace(namespace)
        const value = this.data[namespace].pop(value)
        return Promise.resolve(value)
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    shift(namespace) {
        this.checkNamespace(namespace)
        const value = this.data[namespace].shift()
        return Promise.resolve(value)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {any} value 
     * @returns {Promise.<any>}
     */
    unshift(namespace, value) {
        this.checkNamespace(namespace)
        this.data[namespace].unshift(value)
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<Array.<any>>}
     */
    getAll(namespace) {
        this.checkNamespace(namespace)
        return Promise.resolve(this.data[namespace])
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    delete(namespace) {
        this.checkNamespace(namespace)
        this.data[namespace] = []
        return Promise.resolve()
    }

    checkNamespace(namespace) {
        if (typeof this.data[namespace] === 'undefined') {
            this.data[namespace] = []
        }
    }
}


class InMemoryStorageAdapter extends StorageAdapter {
    
    
    initalize() {}

    keyValue = new InMemoryKeyValueStore()

    list = new InMemoryListStore()
}

export default InMemoryStorageAdapter