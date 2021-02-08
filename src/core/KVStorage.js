import Adapter from '../adapters/Adapter'

/**
 * @template T
 */
class KVStorage {

    /**
     * 
     * @private
     * @type {Adapter}
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
     * @param {Adapter} adapter 
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
                map.set(key, this.processEntry(object[key]))
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
            return this.processEntry(value)
        })
    }

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<boolean>}
     */
    save = (key, data) => this.adapter.save(this.namepsace, key, data)

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<boolean>}
     */
    update = (key, data) => this.adapter.update(this.namepsace, key, data)

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<any>}
     */
    delete = (key) => this.adapter.delete(this.namepsace, key)

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<boolean>}
     */
    exist = (key) => this.adapter.exist(this.namepsace, key)

    /**
     * 
     * @param {any} entry
     * @returns {T} 
     */
    processEntry = entry => entry

}

export default KVStorage