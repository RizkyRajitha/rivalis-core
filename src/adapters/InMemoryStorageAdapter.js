import SharedStorageAdapter from './SharedStorageAdapter'

class InMemoryStorageAdapter extends SharedStorageAdapter {
    
    /**
     * 
     * @type {Object.<string,Object.<string,string>>}
     */
    namespaces = {}
    
    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<any>} 
     */
    save(namespace, key, value) {
        this.checkNamespace(namespace)
        this.namespaces[namespace][key] = value
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<boolean>} 
     */
    savenx(namespace, key, value) {
        this.checkNamespace(namespace)
        if (this.namespaces[namespace][key]) {
            return Promise.resolve(false)
        } else {
            this.namespaces[namespace][key] = value
            return Promise.resolve(true)
        }
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    get(namespace, key) {
        this.checkNamespace(namespace)
        let value = this.namespaces[namespace][key] || null
        return Promise.resolve(value || null)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {
        this.checkNamespace(namespace)
         if (typeof this.namespaces[namespace][key] === 'undefined') {
            return Promise.resolve(false)
        } else {
            return Promise.resolve(true)
        } 
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {
        this.checkNamespace(namespace)
        delete this.namespaces[namespace][key]
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise.<Object.<string,string>>} 
     */
    getAll(namespace) {
        this.checkNamespace(namespace)
        return Promise.resolve(this.namespaces[namespace])
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<number>} 
     */
    count(namespace) {
        this.checkNamespace(namespace)
        return Promise.resolve(Object.keys(this.namespaces[namespace]).length)
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {
        this.checkNamespace(namespace)
        this.namespaces[namespace] = {}
        return Promise.resolve()
    }

    checkNamespace(namespace) {
        if (typeof this.namespaces[namespace] !== 'object') {
            this.namespaces[namespace] = {}
        }
    }
}

export default InMemoryStorageAdapter