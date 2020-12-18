import { Signal } from 'signals'
import Event from '../models/Event'
import MessagingAdapter from '../adapters/MessagingAdapter'

class MessageBroker {

    /** @private */
    PREFIX = '_mb@rivalis:'

    /**
     * @private
     * @type {Signal<Event>}
     */
    signal = new Signal()

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
     * @param {MessagingAdapter} broadcastProvider 
     */
    constructor(namespace, channel, messagingAdapter) {
        this.namespace = this.PREFIX + namespace
        this.channel = channel
        this.messagingAdapter = messagingAdapter
    }

    /**
     * @returns {Promise<boolean>}
     */
    initialize() {
        return this.messagingAdapter.subscribe(this.namespace, this.channel, this.callback)
    }

    add = (listener) => this.signal.add(listener)

    addOnce = (listener) => this.signal.addOnce(listener)

    /**
     * 
     * @param {string} channel
     * @param {Event} event
     * @returns {Promise<boolean>}
     */
    publish(channel, event)  {
        //TODO: check for your channel
        return this.messagingAdapter.publish(this.namespace, channel, event)
    }

    emit(event) {
        return this.messagingAdapter.emit(this.namespace, event)
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
        const { type, data, receiver } = message
        const event = new Event(type, data, receiver)
        this.signal.dispatch(event)
    }
}

export default MessageBroker