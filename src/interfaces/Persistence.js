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
    init() {
        return Promise.reject(new Exception('Persistence#init is not implemented'))
    }

    /**
     * dispose persistence layer
     * @returns {Promise.<void>}
     */
    dispose() {
        return Promise.reject(new Exception('Persistence#dispose is not implemented'))
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
    set(namespace, key, value) {
        return Promise.reject(new Exception('Persistence#dispose is not implemented'))
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
    setnx(namespace, key, value) {
        return Promise.reject(new Exception('Persistence#savenx is not implemented'))
    }

    /**
     * Set a timeout on key. After the timeout has expired, the key will automatically be deleted.
     * @param {string} namespace 
     * @param {string} key
     * @param {number} milliseconds
     * @returns {Promise.<boolean>}
     */
    expire(namespace, key, milliseconds) {
        return Promise.reject(new Exception('Persistence#expire is not implemented'))
    }

    /**
     * Returns the remaining time to live of a key that has a timeout.
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    ttl(namespace, key) {
        return Promise.reject(new Exception('Persistence#ttl is not implemented'))
    }

    /**
     * Get the value of key.
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<string|null>}
     */
    get(namespace, key) {
        return Promise.reject(new Exception('Persistence#get is not implemented'))
    }

    /**
     * Atomically sets key to value and returns the old value stored at key.
     * Returns an error when key exists but does not hold a string value.
     * @param {string} namespace 
     * @param {string} key 
     * @param {string} value
     * @returns {Promise.<void>} 
     */
    getset(namespace, key, value) {
        return Promise.reject(new Exception('Persistence#getset is not implemented'))
    }

    /**
     * Check existence of the key.
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {
        return Promise.reject(new Exception('Persistence#exist is not implemented'))
    }

    /**
     * Removes the specified keys. A key is ignored if it does not exist.
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<void>} 
     */
    delete(namespace, key) {
        return Promise.reject(new Exception('Persistence#delete is not implemented'))
    }

    /**
     * Returns all keys
     * @param {string} namespace
     * @returns {Promise.<Object.<string,string>>} 
     */
    keys(namespace) {
        return Promise.reject(new Exception('Persistence#keys is not implemented'))
    }

    /**
     * Increments the number stored at key by increment.
     * @param {string} namespace 
     * @param {string} key 
     * @param {number} value 
     * @returns {Promise.<number>}
     */
    incrby(namespace, key, value) {
        return Promise.reject(new Exception('Persistence#incrby is not implemented'))
    }

    /**
     * Decrements the number stored at key by decrement.
     * @param {string} namespace 
     * @param {string} key 
     * @param {number} value 
     * @returns {Promise.<number>}
     */
    decrby(namespace, key, value) {
        return Promise.reject(new Exception('Persistence#decrby is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<void>} 
     */
    clear(namespace) {
        return Promise.reject(new Exception('Persistence#clear is not implemented'))
    }

    /**
     * Prepend one element to a list
     * @param {string} namespace 
     * @param {string} key
     * @param {string} value 
     * @returns {Promise.<number>}
     */
    lpush(namespace, key, value) {
        return Promise.reject(new Exception('Persistence#lpush is not implemented'))
    }

    /**
     * Remove and get the first element in a list
     * @param {string} namespace
     * @param {string} key 
     * @returns {Promise.<string>}
     */
    lpop(namespace, key) {
        return Promise.reject(new Exception('Persistence#lpop is not implemented'))
    }

    /**
     * Append one element to a list
     * @param {string} namespace 
     * @param {string} key
     * @param {string} value 
     * @returns {Promise.<number>}
     */
    rpush(namespace, key, value) {
        return Promise.reject(new Exception('Persistence#rpush is not implemented'))
    }

    /**
     * Remove and get the last element in a list
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<string>}
     */
    rpop(namespace, key) {
        return Promise.reject(new Exception('Persistence#rpop is not implemented'))
    }

    /**
     * Remove the last element in a list, prepend it to another list and return it
     * @param {string} namespace 
     * @param {string} source 
     * @param {string} destination 
     * @returns {Promise.<string>}
     */
    rpoplpush(namespace, source, destination) {
        return Promise.reject(new Exception('Persistence#rpoplpush is not implemented'))
    }

    /**
     * Returns the length of the list
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<number>}
     */
    length(namespace, key) {
        return Promise.reject(new Exception('Persistence#length is not implemented'))
    }

    /**
     * Remove a list
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<void>}
     */
    remove(namespace, key) {
        return Promise.reject(new Exception('Persistence#remove is not implemented'))
    }

    /**
     * Subscribes the client to the specified address
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener 
     * @returns {Promise.<void>} 
     */
    subscribe(namespace, address, listener) {
        return Promise.reject(new Exception('Persistence#subscribe is not implemented'))
    }

    /**
     * Unsubscribes the client from the given address
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener 
     * @returns {Promise.<void>} 
     */
    unsubscribe(namespace, address, listener) {
        return Promise.reject(new Exception('Persistence#unsubscribe is not implemented'))
    }

    /**
     * Posts a message to the given channel
     * @param {string} namespace 
     * @param {string} address 
     * @param {string} message
     * @returns {Promise.<void>} 
     */
    publish(namespace, address, message) {
        return Promise.reject(new Exception('Persistence#publish is not implemented'))
    }


}

export default Persistence