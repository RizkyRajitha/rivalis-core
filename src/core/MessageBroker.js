import { Signal } from 'signals'
import Event from '../struct/Event'
import MessagingAdapter from '../adapters/MessagingAdapter'

/**
 * @callback EventCallback
 * @param {Event} event
 */

class MessageBroker {

    /**
     * @private
     * @type {Signal<Event>}
     */
    eventReceiver = new Signal()

    /**
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * @private
     * @type {string}
     */
    channel = null

    /**
     * @private
     * @type {MessagingAdapter}
     */
    messagingAdapter = null

   /**
    * 
    * @param {string} namespace 
    * @param {string} channel 
    * @param {MessagingAdapter} messagingAdapter 
    */
    constructor(namespace, channel, messagingAdapter) {
        this.namespace = namespace
        this.channel = channel
        this.messagingAdapter = messagingAdapter
    }

    /**
     * @returns {Promise<boolean>}
     */
    initialize() {
        return this.messagingAdapter.subscribe(this.namespace, this.channel, this.callback)
    }

    /**
     * 
     * @param {EventCallback} listener 
     * @param {Object} context 
     */
    add = (listener, context) => this.eventReceiver.add(listener, context)

    /**
     * 
     * @param {EventCallback} listener 
     * @param {Object} context 
     */
    addOnce = (listener, context) => this.eventReceiver.addOnce(listener, context)

    /**
     * 
     * @param {string} channel
     * @param {Event} event
     * @returns {Promise<boolean>}
     */
    publish(event)  {
        //TODO: check for your channel
        return this.messagingAdapter.publish(this.namespace, this.channel, event)
    }

    /**
     * @return {Promise<null>}
     */
    destroy() {
        return this.messagingAdapter.unsubscribe(this.namespace, this.channel)
    }

    /**
     * @private
     * @type {Function}
     */
    callback = message => {
        const { type, clock, senderId, data } = message
        const event = new Event(type, clock, senderId, data)
        this.eventReceiver.dispatch(event)
    }
}

export default MessageBroker