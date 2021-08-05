import Persistence from '../interfaces/Persistence'
import Exception from './Exception'
import EventEmitter from '../structs/EventEmitter'

/**
 * @callback MessageListener
 * @param {string} message
 */

class InMemoryPersistence extends Persistence {

    /**
     * @type {Object.<string,Object.<string,Array>>}
     */
    kv = null

    /**
     * @type {Object.<string,Object.<string,number>>}
     */
    exp = null

    /**
     * @type {EventEmitter}
     */
    emitter = null

    /**
     * initialize persistence layer
     * @returns {Promise.<void>}
     */
    async init() {
        this.kv = {}
        this.exp = {}
        this.emitter = new EventEmitter()
    }

    /**
     * dispose persistence layer
     * @returns {Promise.<void>}
     */
    async dispose() {
        this.kv = null
        this.exp = null
        this.emitter.removeAllListeners()
        this.emitter = null
    }

    /**
     * Set key to hold the string value.
     * If key already holds a value, it is overwritten,
     * regardless of its type. Any previous time to live
     * associated with the key is discarded
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<void>} 
     */
    async set(namespace, key, value) {
        this.checkType('string', namespace, key, value)
        this.validate(namespace, key, true)
        this.kv[namespace][key] = value
    }

    /**
     * Set key to hold string value if key does not exist.
     * In that case, it is equal to Persistence#set. When key already holds a value,
     * no operation is performed. 
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<boolean>} 
     */
    async setnx(namespace, key, value) {
        this.checkType('string', namespace, key, value)
        this.validate(namespace, key)
        if (typeof this.kv[namespace][key] === 'undefined') {
            this.kv[namespace][key] = value
            return true
        } else {
            return false
        }
    }

    /**
     * Set a timeout on key. After the timeout has expired, the key will automatically be deleted.
     * @param {string} namespace 
     * @param {string} key
     * @param {number} milliseconds
     * @returns {Promise.<boolean>}
     */
    async expire(namespace, key, milliseconds = 0) {
        this.checkType('string', namespace, key)
        this.checkType('number', milliseconds)
        this.validate(namespace, key)
        this.exp[namespace][key] = new Date().getTime() + milliseconds
        return true
    }

    /**
     * Returns the remaining time to live of a key that has a timeout.
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    async ttl(namespace, key) {
        this.checkType('string', namespace, key)
        this.validate(namespace, key)
        if (typeof this.exp[namespace][key] === 'undefined') {
            return -1
        }
        return this.exp[namespace][key] - new Date().getTime()
    }

    /**
     * Get the value of key.
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    async get(namespace, key) {
        this.checkType('string', namespace, key)
        this.validate(namespace, key)
        return this.kv[namespace][key] || null
    }

    /**
     * Atomically sets key to value and returns the old value stored at key.
     * Returns an error when key exists but does not hold a string value.
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<void>} 
     */
    async getset(namespace, key, value) {
        this.checkType('string', namespace, key, value)
        let temp = await this.get(namespace, key)
        await this.set(namespace, key, value)
        return temp
    }

    /**
     * Check existence of the key.
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    async exist(namespace, key) {
        this.checkType('string', namespace, key)
        this.validate(namespace, key)
        return typeof this.kv[namespace][key] !== 'undefined'
    }

    /**
     * Removes the specified keys. A key is ignored if it does not exist.
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<void>} 
     */
    async delete(namespace, key) {
        this.checkType('string', namespace, key)
        await this.expire(namespace, key)
    }

    /**
     * Returns all keys
     * @param {string} namespace
     * @returns {Promise.<Array.<string>>} 
     */
    async keys(namespace) {
        this.checkType('string', namespace)
        return Object.keys(this.kv[namespace] || {})
    }

    /**
     * Increments the number stored at key by increment.
     * @param {string} namespace 
     * @param {string} key 
     * @param {number} value 
     * @returns {Promise.<number>}
     */
    async incrby(namespace, key, value) {
        this.checkType('string', namespace, key)
        this.checkType('number', value)
        let data = await this.get(namespace, key)
        if (data === null) {
            data = '0'
        }
        if (this.isNumber(data)) {
            let caluclated = JSON.stringify(parseInt(data) + value)
            await this.set(namespace, key, caluclated)
            return await this.get(namespace, key)
        } else {
            throw new Exception('is not a number')
        }
    }

    /**
     * Decrements the number stored at key by decrement.
     * @param {string} namespace 
     * @param {string} key 
     * @param {number} value 
     * @returns {Promise.<number>}
     */
    async decrby(namespace, key, value) {
        this.checkType('string', namespace, key)
        this.checkType('number', value)
        let data = await this.get(namespace, key)
        if (data === null) {
            data = '0'
        }
        if (this.isNumber(data)) {
            let caluclated = JSON.stringify(parseInt(data) - value)
            await this.set(namespace, key, caluclated)
            return await this.get(namespace, key)
        } else {
            throw new Exception('value is not an integer or out of range') // TODO: better message
        }
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<void>} 
     */
    async clear(namespace) {
        this.checkType('string', namespace)
        let keys = await this.keys(namespace)
        for (let key of keys) {
            await this.delete(namespace, key)
        }
    }

    /**
     * Prepend one element to a list
     * @param {string} namespace 
     * @param {string} key
     * @param {string} value 
     * @returns {Promise.<number>}
     */
    async lpush(namespace, key, value) {
        this.checkType('string', namespace, key, value)
        this.validate(namespace, key, true, true)
        this.kv[namespace][key].unshift(value)
        return this.kv[namespace][key].length
    }

    /**
     * Remove and get the first element in a list
     * @param {string} namespace
     * @param {string} key
     * @returns {Promise.<string>}
     */
    async lpop(namespace, key) {
        this.checkType('string', namespace, key)
        this.validate(namespace, key, true, true)
        return this.kv[namespace][key].shift() || null
    }

    /**
     * Append one element to a list
     * @param {string} namespace 
     * @param {string} key
     * @param {string} value 
     * @returns {Promise.<number>}
     */
    async rpush(namespace, key, value) {
        this.checkType('string', namespace, key, value)
        this.validate(namespace, key, true, true)
        this.kv[namespace][key].push(value)
        return this.kv[namespace][key].length
    }

    /**
     * Remove and get the last element in a list
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<string>}
     */
    async rpop(namespace, key) {
        this.checkType('string', namespace, key)
        this.validate(namespace, key, true, true)
        return this.kv[namespace][key].pop() || null
    }

    /**
     * Remove the last element in a list, prepend it to another list and return it
     * @param {string} namespace 
     * @param {string} source 
     * @param {string} destination 
     * @returns {Promise.<string>}
     */
    async rpoplpush(namespace, source, destination) {
        this.checkType('string', namespace, source, destination)
        let value = null
        try {
            value = await this.rpop(namespace, source)
        } catch (error) {
            return null
        }
        if (value === null) {
            return null
        } else {
            try {
                await this.lpush(namespace, destination, value)
            } catch (error) {
                await this.rpush(namespace, source, value)
                return null
            }
            return value
        }
    }

    /**
     * Returns the length of the list
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    async length(namespace, key) {
        this.checkType('string', namespace, key)
        let field = this.kv[namespace][key]
        if (Array.isArray(field)) {
            return field.length
        } else if (typeof field === 'undefined') {
            return 0
        } else {
            throw new Exception('Operation against a key holding the wrong kind of value')
        }
    }

    /**
     * Subscribes the client to the specified address
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener 
     * @returns {Promise.<void>} 
     */
    async subscribe(namespace, address, listener) {
        this.checkType('string', namespace, address)
        this.checkType('function', listener)
        this.emitter.on(`${namespace}-${address}`, listener)
    }

    /**
     * Unsubscribes the client from the given address
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener 
     * @returns {Promise.<void>} 
     */
    async unsubscribe(namespace, address, listener) {
        this.checkType('string', namespace, address)
        this.checkType('function', listener)
        this.emitter.off(`${namespace}-${address}`, listener)
    }

    /**
     * Posts a message to the given channel
     * @param {string} namespace 
     * @param {string} address 
     * @param {string} message
     * @returns {Promise.<void>} 
     */
    async publish(namespace, address, message) {
        this.checkType('string', namespace, address, message)
        this.emitter.emit(`${namespace}-${address}`, message)
    }

    /**
     * @private
     * @param {string} namespace 
     */
    validate(namespace, key, removeTimeout = false, isList = false) {
        
        if (this.kv === null) {
            throw new Exception('persistence layer is not initialized')
        }
        
        if (typeof this.kv[namespace] === 'undefined') {
            this.kv[namespace] = {}
            this.exp[namespace] = {}
        }
        if (removeTimeout) {
            this.exp[namespace][key] = undefined
        }
        if (typeof this.exp[namespace][key] === 'number') {
            let now = new Date().getTime()
            if (now >= this.exp[namespace][key]) {
                this.exp[namespace][key] = undefined
                this.kv[namespace][key] = undefined
            }
        }
        if (isList && typeof this.kv[namespace][key] === 'undefined') {
            this.kv[namespace][key] = []
        } else if (isList && !Array.isArray(this.kv[namespace][key])) {
            throw new Exception('Operation against a key holding the wrong kind of value')
        }
    }

    /**
     * @private
     * @param {string} value 
     * @returns {boolean}
     */
    isNumber(value) {
        return JSON.stringify(parseInt(value, 10)) === value
    }

    /**
     * 
     * @param {('string'|'number'|'function')} type 
     * @param  {...string|number} values
     */
    checkType(type, ...values) {
        for (let value of values) {
            if (typeof value !== type) {
                throw new Exception(`incorrect value type, must be a ${type}`)
            }
        }
    }

}

export default InMemoryPersistence