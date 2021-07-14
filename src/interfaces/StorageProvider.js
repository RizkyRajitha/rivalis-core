import Exception from '../core/Exception'

class StorageProvider {

    /**
     * 
     * @returns {Promise.<any>}
     */
    init() {
        return Promise.reject(new Exception('StorageProvider#initialize is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<any>} 
     */
    save(namespace, key, value) {
        return Promise.reject(new Exception('StorageProvider#save is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<boolean>} 
     */
    savenx(namespace, key, value) {
        return Promise.reject(new Exception('StorageProvider#savenx is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @param {number} milliseconds
     * @returns {Promise.<boolean>}
     */
    expire(namespace, key, milliseconds) {
        return Promise.reject(new Exception('StorageProvider#expire is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    ttl(namespace, key) {
        return Promise.reject(new Exception('StorageProvider#expire is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    get(namespace, key) {
        return Promise.reject(new Exception('StorageProvider#get is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {
        return Promise.reject(new Exception('StorageProvider#exist is not implemented'))
    }

     /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {
        return Promise.reject(new Exception('StorageProvider#delete is not implemented'))
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise.<Object.<string,string>>} 
     */
    getAll(namespace) {
        return Promise.reject(new Exception('StorageProvider#getAll is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<number>} 
     */
    count(namespace) {
        return Promise.reject(new Exception('StorageProvider#count is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<void>} 
     */
    clear(namespace) {
        return Promise.reject(new Exception('StorageProvider#clear is not implemented'))
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        return Promise.reject(new Exception('StorageProvider#dispose is not implemented'))
    }

}

export default StorageProvider