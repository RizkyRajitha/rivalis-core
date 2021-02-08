import EventEmitter from 'eventemitter3'
import Adapter from './Adapter'

class InMemoryAdapter extends Adapter {
    
    /**
     * 
     * @type {EventEmitter}
     */
    emitter = null

    /**
     * 
     * @type {Map.<string,Map>}
     */
    storage = null

    /**
     * 
     * @type {Map.<string,Array.<any>>}
     */
    lists = null

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        this.emitter = new EventEmitter()
        this.storage = new Map()
        this.lists = new Map()
        return Promise.resolve()
    }

    /**
     * subscribe to specific address for receiving messages
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener
     * @returns {Promise.<any>} 
     */
    subscribe(namespace, address, listener) {
        this.emitter.on(this.getAddress(namespace, address), listener)
        return Promise.resolve()
    }

    /**
     * unsubscribe of already subscribed address
     * @param {string} namespace 
     * @param {string} address
     * @param {MessageListener} listener
     * @returns {Promise.<any>}
     */
    unsubscribe(namespace, address, listener) {
        this.emitter.off(this.getAddress(namespace, address), listener)
        return Promise.resolve()
    }

    /**
     * publish message to ant address
     * @param {string} namespace 
     * @param {string} address 
     * @param {any} message
     * @returns {Promise.<any>} 
     */
    publish(namespace, address, message) {
        message = JSON.parse(JSON.stringify(message))
        this.emitter.emit(this.getAddress(namespace, address), message)
        return Promise.resolve()
    }

     /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise.<boolean>} 
     */
    save(namespace, key, value) {
        if (this.storage.has(this.getAddress(namespace, key))) {
            return Promise.resolve(false)
        }
        this.storage.set(this.getAddress(namespace, key), value)
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @param {any} value
     * @returns {Promise.<boolean>} 
     */
    update(namespace, key, value) {
        if (this.storage.has(this.getAddress(namespace, key))) {
            this.storage.set(this.getAddress(namespace, key), value)
            return Promise.resolve(true)
        }
        return Promise.resolve(false)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key 
     * @returns {Promise.<any>}
     */
    get(namespace, key) {
        let value = this.storage.get(this.getAddress(namespace, key))
        return Promise.resolve(value)
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise.<object>} 
     */
    getAll(namespace) {
        let output = {}
        let keys = this.getNamespaceKeys(namespace)
        for (let key of keys) {
            output[key] = this.storage.get(this.getAddress(namespace, key))
        }
        return Promise.resolve(output)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<boolean>} 
     */
    exist(namespace, key) {
        let exist = this.storage.has(this.getAddress(namespace, key))
        return Promise.resolve(exist)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} key
     * @returns {Promise.<any>} 
     */
    delete(namespace, key) {
        this.storage.delete(this.getAddress(namespace, key))
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>} 
     */
    clear(namespace) {
        for (let key of this.getNamespaceKeys(namespace)) {
            this.storage.delete(this.getAddress(namespace, key))
        }
        return Promise.resolve()
    }

    
    /**
     * 
     * @private
     * @param {string} namespace 
     * @param {string} address
     * @returns {string} 
     */
    getAddress(namespace, address) {
        return `${namespace}---${address}`
    }

    /**
     * 
     * @private
     * @param {string} namespace 
     * @returns {Array.<string>}
     */
    getNamespaceKeys(namespace) {
        let list = []
        this.storage.forEach((value, key) => {
            if (key.split('---')[0] === namespace) {
                list.push(key.split('---')[1])
            }
        })
        return list
    }
}

export default InMemoryAdapter