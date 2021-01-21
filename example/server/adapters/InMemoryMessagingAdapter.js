import EventEmitter from 'eventemitter3'
import { MessagingAdapter } from '../../../src'

/**
 * @callback MessageListener
 * @param {any} message
 */

class InMemoryMessagingAdapter extends MessagingAdapter {

    eventEmitter = new EventEmitter()

    /**
     * Initalizing connection to messaging server
     * @returns {Promise.<any>}
     */
    initalize = () => Promise.resolve()

    /**
     * subscribe to specific address for receiving messages
     * @param {string} namespace 
     * @param {string} address 
     * @param {MessageListener} listener
     * @returns {Promise.<any>} 
     */
    subscribe(namespace, address, listener) {
        const channel = `${namespace}:${address}`
        this.eventEmitter.on(channel, listener)
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
        const channel = `${namespace}:${address}`
        this.eventEmitter.off(channel, listener)
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
        const channel = `${namespace}:${address}`
        this.eventEmitter.emit(channel, message)
        return Promise.resolve()
    }
}

export default InMemoryMessagingAdapter