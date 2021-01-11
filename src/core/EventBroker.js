import { Signal } from 'signals'
import MessagingAdapter from '../adapters/MessagingAdapter'
import Event from '../structs/Event'

/**
 * @callback EventListener
 * @param {Event} event
 */


class EventBroker {

    /**
     * 
     * @private
     * @readonly
     * @type {string}
     */
    namespace = null

    /**
     * 
     * @private
     * @type {MessagingAdapter}
     */
    messagingAdapter = null

    /**
     * 
     * @private
     * @type {Signal.<Event>}
     */
    eventReceiver = new Signal()


    /**
     * 
     * @param {string} namespace 
     * @param {MessagingAdapter} messagingAdapter 
     */
    constructor(namespace, messagingAdapter) {
        this.namespace = namespace
        this.messagingAdapter = messagingAdapter
    }

    initalize() {
        this.messagingAdapter.subscribe(this.namespace, 'events', this.messageHandler)
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {object} context 
     */
    add = (listener, context) => this.eventReceiver.add(listener, context)

    /**
     * 
     * @param {EventListener} listener 
     * @param {object} context 
     */
    remove = (listener, context) => this.eventReceiver.remove(listener, context)

    /**
     * 
     * @param {Event} event 
     */
    emit(event) {
        this.messagingAdapter.publish(this.namespace, 'events', event)
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        return this.messagingAdapter.unsubscribe(this.namespace, 'events', this.messageHandler)
    }

    /**
     * 
     * @private
     * @param {any} message 
     */
    messageHandler = (message) => {
        const event = new Event(message)
        this.eventReceiver.dispatch(event)
    }

}

export default EventBroker