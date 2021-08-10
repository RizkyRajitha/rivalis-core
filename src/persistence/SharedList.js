import Persistence from '../interfaces/Persistence'
import Codec from '../structs/Codec'

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
     * @private
     * @type {Codec}
     */
    codec = null

     /**
      * 
      * @param {Persistence} persistence 
      * @param {string} namespace 
      * @param {string} key 
      */
    constructor(persistence, namespace, key, codec = null) {
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

    async unshift() {
        let value = await this.persistence.rpop(this.namespace, this.key)
        if (value === null) {
            return null
        }
        return this.decode(value)
    }

    getLength() {
        return this.persistence.length(this.namespace, this.key)
    }

    clear() {
        return this.persistence.delete(this.namespace, this.key)
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

export default SharedList