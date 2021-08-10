import Persistence from '../interfaces/Persistence'

/**
 * @template T
 */
 class SharedStorage {


    /**
     * @private
     * @type {Persistence}
     */
    persistence = null

    /**
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * @private
     * @type {Codec.<T>|null}
     */
    codec = null

    /**
     * 
     * @param {Persistence} persistence 
     * @param {string} namespace 
     * @param {Codec} [codec] 
     */
    constructor(persistence, namespace, codec = null) {
        this.persistence = persistence
        this.namespace = namespace
        this.codec = codec
    }

    /**
     * @returns {Promise.<Map<string, T>>}
     */
    async getAll() {
        let keys = await this.persistence.keys(this.namespace)
        let items = await this.persistence.getmultiple(this.namespace, ...keys)
        let map = new Map()
        for (let [ index, key ] of keys.entries()) {
            map.set(key, this.decode(items[index]))
        }
        return map
    }

    /**
     * 
     * @param {string} key
     * @returns {Promise.<T|null>} 
     */
    async get(key) {
        let value = await this.persistence.get(this.namespace, key)
        return value !== null ? this.decode(value) : null
    }

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<void>}
     */
    save(key, data) {
        return this.persistence.set(this.namespace, key, this.encode(data))
    }

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<boolean>}
     */
    savenx(key, data) {
        return this.persistence.setnx(this.namespace, key, this.encode(data))
    }

    /**
     * 
     * @param {string} key 
     * @param {number} milliseconds 
     * @returns {Promise.<boolean>}
     */
    expire(key, milliseconds) {
        return this.persistence.expire(this.namespace, key, milliseconds)
    }

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    ttl(key) {
        return this.persistence.ttl(this.namespace, key)
    }
    
    /**
     * 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<T|null>} 
     */
    async getset(key, data) {
        let value = await this.persistence.getset(this.namespace, key, this.encode(data))
        return value !== null ? this.decode(value) : null
    }

    /**
     * 
     * @param {...string} keys
     * @returns {Promise.<void>}
     */
    delete(...keys) {
        return this.persistence.deletemultiple(this.namespace, ...keys)
    }

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<boolean>}
     */
    exist(key) {
        return this.persistence.exist(this.namespace, key)
    }

    /**
     * 
     * @returns {Promise.<Array.<string>>}
     */
    keys() {
        return this.persistence.keys(this.namespace)
    }
    
    /**
     * 
     * @returns {Promise.<void>}
     */
    async clear() {
        let keys = await this.keys()
        return this.delete(...keys)
    }

    
    /**
     * @private
     * @param {T} data 
     * @returns {string}
     */
    encode(data) {
        if (this.codec !== null) {
            data = this.codec.encode(data)
        }
        return JSON.stringify(data)
    }

    /**
     * @private
     * @param {string} data 
     * @returns {T}
     */
    decode(data) {
        data = JSON.parse(data)
        if (this.codec !== null) {
            data = this.codec.decode(data)
        }
        return data
    }

}

export default SharedStorage