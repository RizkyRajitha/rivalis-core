import Exception from '../core/Exception'

/**
 * @callback MessageListener
 * @param {string} message
 */

class Persistence {

    /**
     * initialize persistence layer
     * @returns {Promise.<void>}
     */
    async init() {
        throw new Exception('Persistence#init is not implemented')
    }

    /**
     * dispose persistence layer
     * @returns {Promise.<void>}
     */
    async dispose() {
        throw new Exception('Persistence#dispose is not implemented')
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
        throw new Exception('Persistence#dispose is not implemented')
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
        throw new Exception('Persistence#savenx is not implemented')
    }

    /**
     * Set a timeout on key. After the timeout has expired, the key will automatically be deleted.
     * @param {string} namespace 
     * @param {string} key
     * @param {number} milliseconds
     * @returns {Promise.<boolean>}
     */
    async expire(namespace, key, milliseconds) {
        throw new Exception('Persistence#expire is not implemented')
    }

    /**
     * Returns the remaining time to live of a key that has a timeout.
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    async ttl(namespace, key) {
        throw new Exception('Persistence#ttl is not implemented')
    }

    /**
     * Get the value of key.
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    async get(namespace, key) {
        throw new Exception('Persistence#get is not implemented')
    }

    /**
     * Get multiple keys at once
     * @param {string} namespace 
     * @param  {...string} keys 
     * @returns {Promise.<Array.<string>>}
     */
     async getmultiple(namespace, ...keys) {
        throw new Exception('Persistence#getmultiple is not implemented')
    }

    /**
     * Atomically sets key to value and returns the old value stored at key.
     * Returns an error when key exists but does not hold a string value.
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<string>} 
     */
    async getset(namespace, key, value) {
        throw new Exception('Persistence#getset is not implemented')
    }

    /**
     * Check existence of the key.
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    async exist(namespace, key) {
        throw new Exception('Persistence#exist is not implemented')
    }

    /**
     * Removes the specified keys. A key is ignored if it does not exist.
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<void>} 
     */
    async delete(namespace, key) {
        throw new Exception('Persistence#delete is not implemented')
    }

    /**
     * Returns all keys
     * @param {string} namespace
     * @returns {Promise.<Array.<string>>} 
     */
    async keys(namespace) {
        throw new Exception('Persistence#keys is not implemented')
    }

    /**
     * Increments the number stored at key by increment.
     * @param {string} namespace 
     * @param {string} key 
     * @param {number} value 
     * @returns {Promise.<number>}
     */
    async incrby(namespace, key, value) {
        throw new Exception('Persistence#incrby is not implemented')
    }

    /**
     * Decrements the number stored at key by decrement.
     * @param {string} namespace 
     * @param {string} key 
     * @param {number} value 
     * @returns {Promise.<number>}
     */
    async decrby(namespace, key, value) {
        throw new Exception('Persistence#decrby is not implemented')
    }

    /**
     * 
     * @param {string} namespace 
     * @param  {...string} keys
     * @returns {Promise.<void>} 
     */
    async deletemultiple(namespace, ...keys) {
        throw new Exception('Persistence#deletemultiple is not implemented')
    }

    /**
     * Prepend one element to a list
     * @param {string} namespace 
     * @param {string} key
     * @param {string} value 
     * @returns {Promise.<number>}
     */
    async lpush(namespace, key, value) {
        throw new Exception('Persistence#lpush is not implemented')
    }

    /**
     * Remove and get the first element in a list
     * @param {string} namespace
     * @param {string} key 
     * @returns {Promise.<string>}
     */
    async lpop(namespace, key) {
        throw new Exception('Persistence#lpop is not implemented')
    }

    /**
     * Append one element to a list
     * @param {string} namespace 
     * @param {string} key
     * @param {string} value 
     * @returns {Promise.<number>}
     */
    async rpush(namespace, key, value) {
        throw new Exception('Persistence#rpush is not implemented')
    }

    /**
     * Remove and get the last element in a list
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<string>}
     */
    async rpop(namespace, key) {
        throw new Exception('Persistence#rpop is not implemented')
    }

    /**
     * Remove the last element in a list, prepend it to another list and return it
     * @param {string} namespace 
     * @param {string} source 
     * @param {string} destination 
     * @returns {Promise.<string>}
     */
    async rpoplpush(namespace, source, destination) {
        throw new Exception('Persistence#rpoplpush is not implemented')
    }

    /**
     * Returns the length of the list
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    async length(namespace, key) {
        throw new Exception('Persistence#length is not implemented')
    }

    /**
     * Remove a list
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<void>}
     */
    async remove(namespace, key) {
        throw new Exception('Persistence#remove is not implemented')
    }

    /**
     * Subscribes the client to the specified address
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener 
     * @returns {Promise.<void>} 
     */
    async subscribe(namespace, address, listener) {
        throw new Exception('Persistence#subscribe is not implemented')
    }

    /**
     * Unsubscribes the client from the given address
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener 
     * @returns {Promise.<void>} 
     */
    async unsubscribe(namespace, address, listener) {
        throw new Exception('Persistence#unsubscribe is not implemented')
    }

    /**
     * Posts a message to the given channel
     * @param {string} namespace 
     * @param {string} address 
     * @param {string} message
     * @returns {Promise.<void>} 
     */
    async publish(namespace, address, message) {
        throw new Exception('Persistence#publish is not implemented')
    }


}

export default Persistence