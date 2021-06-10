import SharedStorageAdapter from '../adapters/SharedStorageAdapter'

/**
 * @template T
 * @class
 * @author Daniel Kalevski
 * @since 0.5.0
 * 
 * // TODO: short docs
 */
class SharedStorage {

    /**
     * 
     * @private
     * @type {SharedStorageAdapter}
     */
    adapter = null

     /**
     * 
     * @private
     * @type {string}
     */
    namepsace = null
 
     /**
     * 
     * @param {SharedStorageAdapter} adapter 
     * @param {string} namespace 
     */
    constructor(adapter, namespace) {
         this.adapter = adapter
         this.namepsace = namespace
    }

    /**
     * @returns {Promise.<Map<string, T>>}
     */
    getAll() {
        return this.adapter.getAll(this.namepsace).then(object => {
            let map = new Map()
            for (let key in object) {
                map.set(key, this.mapOutput(object[key]))
            }
            return map
        })
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise.<T|null>} 
     */
    get(key) {
        return this.adapter.get(this.namepsace, key).then(value => {
            return this.mapOutput(value)
        })
    }

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<any>}
     */
    save(key, data) {
        return this.adapter.save(this.namepsace, key, this.mapInput(data))
    }

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<any>}
     */
     savenx(key, data) {
        return this.adapter.savenx(this.namepsace, key, this.mapInput(data))
    }

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<any>}
     */
    delete(key) {
        return this.adapter.delete(this.namepsace, key)
    }

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<boolean>}
     */
    exist(key) {
        return this.adapter.exist(this.namepsace, key)
    }

    /**
     * 
     * @returns {Promise.<number>}
     */
    count() {
        return this.adapter.count(this.namepsace)
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    clear() {
        return this.adapter.clear(this.namepsace)
    }

    /**
     * 
     * @protected
     * @param {T} entry
     * @returns {string} 
     */
    mapInput = entry => JSON.stringify(entry)

    /**
     * 
     * @protected
     * @param {string} entry
     * @returns {T} 
     */
    mapOutput = entry => JSON.parse(entry)
}

export default SharedStorage