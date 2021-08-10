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
        this.key = `rcount-${key}`
    }

    async get() {
        let value = await this.persistence.get(this.namespace, this.key)
        if (value === null) {
            return 0
        } else {
            return parseInt(value, 10)
        }
    }

    increment(value = 1) {
        return this.persistence.incrby(this.namespace, this.key, value)
    }

    decrement(value = 1) {
        return this.persistence.decrby(this.namespace, this.key, value)
    }

    expire(milliseconds) {
        return this.persistence.expire(this.namespace, this.key, milliseconds)
    }

    ttl() {
        return this.persistence.ttl(this.namespace, this.key)
    }

    clear() {
        return this.persistence.delete(this.namespace, this.key)
    }

}

export default SharedCounter