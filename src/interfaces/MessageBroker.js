import { Signal } from 'signals'
import MessageBrokerAdapter from '../adapters/MessageBrokerAdapter'

/**
 * @template T
 * @class
 * @author Daniel Kalevski
 * @since 0.5.0
 * 
 * // TODO: short docs
 */
class MessageBroker {

    /**
     * 
     * @private
     * @type {string}
     */
    namespace = null

     /**
     * 
     * @private
     * @type {string}
     */
    address = null

     /**
     * 
     * @private
     * @type {MessageBrokerAdapter}
     */
    adapter = null

    /**
     * 
     * @private
     * @type {boolean}
     */
    subscribed = false

    /**
     * 
     * @private
     * @type {Signal.<T>}
     */
    eventReceiver = new Signal()

    /**
     * 
     * @param {MessageBrokerAdapter} adapter 
     * @param {string} namespace
     * @param {string} address 
     */
    constructor(adapter, namespace, address) {
        this.namespace = namespace
        this.address = address
        this.adapter = adapter
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        if (!this.subscribed) {
            return this.adapter.subscribe(this.namespace, this.address, this.messageHandler)
        } else {
            return Promise.resolve()
        }
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    subscribe(listener, context) {
        this.eventReceiver.add(listener, context)
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    unsubscribe(listener, context) {
        this.eventReceiver.remove(listener, context)
    }

    /**
     * 
     * @param {T} message
     * @returns {Promise.<any>}
     */
    emit(message) {
        return this.adapter.publish(this.namespace, this.address, this.mapInput(message))
    }

    dispose() {
        return this.adapter.unsubscribe(this.namespace, this.address, this.messageHandler)
    }

    /**
     * 
     * @protected
     * @param {T} message
     * @returns {string} 
     */
    mapInput = message => JSON.stringify(message)

    /**
     * 
     * @protected
     * @param {string} message
     * @returns {T} 
     */
     mapOutput = message => JSON.parse(message)

    /**
     * @private
     * @param {string} message 
     */
    messageHandler = message => {
        message = this.mapOutput(message)
        this.eventReceiver.dispatch(message)
    }

}

export default MessageBroker