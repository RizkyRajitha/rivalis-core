/**
 * @class
 * @author Daniel Kalevski
 * @since 0.5.0
 * 
 * // TODO: short docs
 */
class SharedStorageAdapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {}

     /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<any>} 
     */
    save(namespace, key, value) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<boolean>} 
     */
    savenx(namespace, key, value) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    get(namespace, key) {}

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
     * @returns {Promise.<Object.<string,string>>} 
     */
    getAll(namespace) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<number>} 
     */
    count(namespace) {}

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {}

}

export default SharedStorageAdapter