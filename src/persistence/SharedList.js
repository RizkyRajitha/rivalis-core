import Persistence from '../interfaces/Persistence'

/**
 * @template T
 */
class SharedList {

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
     * @type {string}
     */
    key = null

     /**
      * 
      * @param {Persistence} persistence 
      * @param {string} namespace 
      * @param {string} key 
      */
    constructor(persistence, namespace, key) {
        this.persistence = persistence
        this.namespace = namespace
        this.key = key
    }

    /**
     * 
     * @param {T} value 
     */
    push(value) {
        return this.persistence.rpush(this.namespace, this.key, this.encode(value))
    }

    /**
     * 
     * @returns {Promise.<T>}
     */
    async pop() {
        let value = await this.persistence.rpop(this.namespace, this.key)
        if (value === null) {
            return null
        }
        return this.decode(value)
    }

    /**
     * 
     * @param {T} value
     */
    shift(value) {
        return this.persistence.rpush(this.namespace, this.key, this.encode(value))
    }

    /**
     * 
     * @returns {Promise.<T>}
     */
    async unshift() {
        let value = await this.persistence.rpop(this.namespace, this.key)
        if (value === null) {
            return null
        }
        return this.decode(value)
    }

    /**
     * 
     * @returns {Promise.<number>}
     */
    getLength() {
        return this.persistence.length(this.namespace, this.key)
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    clear() {
        return this.persistence.delete(this.namespace, this.key)
    }

    /**
     * 
     * @param {number} milliseconds 
     * @returns {Promise.<boolean>}
     */
    expire(milliseconds) {
        return this.persistence.expire(this.namespace, this.key, milliseconds)
    }

    /**
     * 
     * @returns {Promise.<number>}
     */
    ttl() {
        return this.persistence.ttl(this.namespace, this.key)
    }

    /**
     * @private
     * @param {T} data 
     * @returns {string}
     */
    encode(data) {
        return JSON.stringify(data)
    }

    /**
     * @private
     * @param {string} data 
     * @returns {T}
     */
    decode(data) {
        data = JSON.parse(data)
        return data
    }

}

export default SharedList