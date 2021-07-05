import Exception from '../core/Exception'

/**
 * @interface SharedStorageAdapter
 * 
 * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
 * @author Daniel Kalevski
 * @since 0.5.0
 * 
 * // TODO: write description
 * 
 */
class SharedStorageAdapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        return Promise.reject(new Exception('SharedStorageAdapter#initialize is not implemented'))
    }

     /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<any>} 
     */
    save(namespace, key, value) {
        return Promise.reject(new Exception('SharedStorageAdapter#save is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<boolean>} 
     */
    savenx(namespace, key, value) {
        return Promise.reject(new Exception('SharedStorageAdapter#savenx is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    get(namespace, key) {
        return Promise.reject(new Exception('SharedStorageAdapter#get is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {
        return Promise.reject(new Exception('SharedStorageAdapter#exist is not implemented'))
    }

     /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {
        return Promise.reject(new Exception('SharedStorageAdapter#delete is not implemented'))
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise.<Object.<string,string>>} 
     */
    getAll(namespace) {
        return Promise.reject(new Exception('SharedStorageAdapter#getAll is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<number>} 
     */
    count(namespace) {
        return Promise.reject(new Exception('SharedStorageAdapter#count is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {
        return Promise.reject(new Exception('SharedStorageAdapter#clear is not implemented'))
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        return Promise.reject(new Exception('SharedStorageAdapter#dispose is not implemented'))
    }

}

export default SharedStorageAdapter