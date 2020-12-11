import { StorageAdapter } from '../src'

class LocalStorageAdapter extends StorageAdapter {

    /**
     * 
     * @returns {Promise<boolean>}
     */
    initialize() {
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise<boolean>} 
     */
    set(namespace, key, value) {
        this.checkNamespace(namespace)
        this[namespace][key] = value
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise<any>}
     */
    get(namespace, key) {
        this.checkNamespace(namespace)
        return Promise.resolve(this[namespace][key] || null)
    }
    

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise<boolean>} 
     */
    delete(namespace, key) {
        this.checkNamespace(namespace)
        delete this[namespace][key]
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise<boolean>} 
     */
    exist(namespace, key) {
        this.checkNamespace(namespace)
        Promise.resolve(typeof this[namespace][key] !== 'undefined')
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise<Object>} 
     */
    getAll(namespace) {
        this.checkNamespace(namespace)
        Promise.resolve(this[namespace])
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise<boolean>} 
     */
    deleteAll(namespace) {
        this.checkNamespace(namespace)
        this[namespace] = {}
        return Promise.resolve(true)
    }

    checkNamespace(namespace) {
        if (typeof this[namespace] === 'undefined') {
            this[namespace] = {}
        }
    }

}

export default LocalStorageAdapter