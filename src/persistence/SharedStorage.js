import StorageProvider from '../interfaces/StorageProvider'
import Codec from '../structs/Codec'

/**
 * @template T
 */
class SharedStorage {


    /**
     * @private
     * @type {StorageProvider}
     */
    provider = null

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
     * @param {StorageProvider} provider 
     * @param {string} namespace 
     * @param {Codec} [codec] 
     */
    constructor(provider, namespace, codec = null) {
        this.provider = provider
        this.namespace = namespace
        this.codec = codec
    }

    /**
     * @returns {Promise.<Map<string, T>>}
     */
    getAll() {
        return this.provider.getAll(this.namespace).then(objects => {
            let map = new Map()
            for (let key in objects) {
                let value = this.decode(objects[key])
                map.set(key, value)
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
        return this.provider.get(this.namespace, key).then(value => {
            return value !== null ? this.decode(value) : null
        })
    }

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<any>}
     */
    save(key, data) {
        return this.provider.save(this.namespace, key, this.encode(data))
    }

    /**
     * 
     * @param {string} key 
     * @param {T} data 
     * @returns {Promise.<boolean>}
     */
    savenx(key, data) {
        return this.provider.savenx(this.namespace, key, this.encode(data))
    }

    /**
     * 
     * @param {string} key 
     * @param {number} seconds 
     * @returns {Promise.<boolean>}
     */
    expire(key, milliseconds) {
        return this.provider.expire(this.namespace, key, milliseconds)
    }

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    ttl(key) {
        return this.provider.ttl(this.namespace, key)
    }
    
    /**
     * 
     * @param {string} key 
     * @returns {Promise.<any>}
     */
    delete(key) {
        return this.provider.delete(this.namespace, key)
    }

    /**
     * 
     * @param {string} key 
     * @returns {Promise.<boolean>}
     */
    exist(key) {
        return this.provider.exist(this.namespace, key)
    }

    /**
     * 
     * @returns {Promise.<number>}
     */
    count() {
        return this.provider.count(this.namespace)
    }
    
    /**
     * 
     * @returns {Promise.<void>}
     */
    clear() {
        return this.provider.clear(this.namespace)
    }

    
    /**
     * 
     * @param {T} value 
     * @returns {string}
     */
    encode(data) {
        if (this.codec !== null) {
            data = this.codec.encode(data)
        }
        return JSON.stringify(data)
    }

    /**
     * 
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