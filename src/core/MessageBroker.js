import { Signal } from 'signals'
import Adapter from '../adapter/Adapter'


/**
 * @template T
 */
class MessageBroker {
    
    /**
     * @callback EventListener
     * @param {T} event
     */

    /**
     * 
     * @protected
     * @type {string}
     */
    namespace = null

    /**
     * 
     * @protected
     * @type {string}
     */
    address = null

    /**
     * 
     * @private
     * @type {Adapter}
     */
    adapter = null

    /**
     * 
     * @private
     * @type {Signal.<T>}
     */
    eventReceiver = new Signal()

    /**
     * 
     * @param {Adapter} adapter 
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
        return this.adapter.subscribe(this.namespace, this.address, this.messageHandler)
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    addListener = (listener, context) => this.eventReceiver.add(listener, context)

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    removeListener = (listener, context) => this.eventReceiver.remove(listener, context)

    /**
     * 
     * @param {T} message
     * @returns {Promise.<any>}
     */
    emit(message) {
        return this.adapter.publish(this.namespace, this.address, message)
    }

    dispose() {
        return this.adapter.unsubscribe(this.namespace, this.address, this.messageHandler)
    }

    /**
     * 
     * @protected
     * @param {any} message
     * @returns {T} 
     */
    processMessage = message => message

    /**
     * @private
     * @param {any} message 
     */
    messageHandler = message => {
        message = this.processMessage(message)
        this.eventReceiver.dispatch(message)
    }

}

export default MessageBroker
