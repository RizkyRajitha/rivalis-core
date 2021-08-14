import Persistence from '../interfaces/Persistence'

class SharedCounter {

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
     * @returns {Promise.<number>}
     */
    async get() {
        let value = await this.persistence.get(this.namespace, this.key)
        if (value === null) {
            return 0
        } else {
            return parseInt(value, 10)
        }
    }

    /**
     * 
     * @param {number} [value=1] 
     * @returns {Promise.<number>}
     */
    increment(value = 1) {
        return this.persistence.incrby(this.namespace, this.key, value)
    }

    /**
     * 
     * @param {number} [value=1] 
     * @returns {Promise.<number>}
     */
    decrement(value = 1) {
        return this.persistence.decrby(this.namespace, this.key, value)
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
     * 
     * @returns {Promise.<void>}
     */
    clear() {
        return this.persistence.delete(this.namespace, this.key)
    }

}

export default SharedCounter