import EventEmitter from 'eventemitter3'
import { MessagingAdapter } from '../src'

class LocalMessagingAdapter extends MessagingAdapter {

    events = {}

    /**
     * 
     * @returns {Promise<boolean>}
     */
    initialize() {
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} channel 
     * @param {subscribeCallback} callback
     * @returns {Promise<boolean>}
     */
    subscribe(namespace, channel, callback) {
        this.createNamespace(namespace)
        /** @type {EventEmitter} */
        let emitter = this.events[namespace]
        emitter.on(channel, callback)
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} channel 
     * @returns {Promise<boolean>}
     */
    unsubscribe(namespace, channel) {
        this.createNamespace(namespace)
        /** @type {EventEmitter} */
        let emitter = this.events[namespace]
        emitter.off(channel, emitter._events[channel].fn)
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} channel 
     * @param {any} data
     * @returns {Promise<boolean>}
     */
    publish(namespace, channel, data) {
        this.createNamespace(namespace)
        /** @type {EventEmitter} */
        let emitter = this.events[namespace]
        emitter.emit(channel, data)
        Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} data 
     * @returns {Promise<boolean>}
     */
    emit(namespace, data) {
        this.createNamespace(namespace)
        /** @type {EventEmitter} */
        let emitter = this.events[namespace]
        let channels = Object.keys(emitter._events)
        for (let channel of channels) {
            this.publish(namespace, channel, data)
        }
        Promise.resolve(true)
    }

    createNamespace(namespace) {
        if (typeof this.events[namespace] === 'undefined') {
            this.events[namespace] = new EventEmitter()
        }
    }
}

export default LocalMessagingAdapter