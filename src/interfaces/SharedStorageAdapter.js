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
        return Promise.reject(new Error('SharedStorageAdapter#initialize not implemented'))
    }

     /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<any>} 
     */
    save(namespace, key, value) {
        return Promise.reject(new Error('SharedStorageAdapter#save not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<boolean>} 
     */
    savenx(namespace, key, value) {
        return Promise.reject(new Error('SharedStorageAdapter#savenx not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    get(namespace, key) {
        return Promise.reject(new Error('SharedStorageAdapter#get not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {
        return Promise.reject(new Error('SharedStorageAdapter#exist not implemented'))
    }

     /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {
        return Promise.reject(new Error('SharedStorageAdapter#delete not implemented'))
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise.<Object.<string,string>>} 
     */
    getAll(namespace) {
        return Promise.reject(new Error('SharedStorageAdapter#getAll not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<number>} 
     */
    count(namespace) {
        return Promise.reject(new Error('SharedStorageAdapter#count not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {
        return Promise.reject(new Error('SharedStorageAdapter#clear not implemented'))
    }

}

export default SharedStorageAdapter