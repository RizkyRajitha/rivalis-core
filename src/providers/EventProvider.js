import { Signal } from 'signals'
import Config from '../Config'
import Event from '../structs/Event'

/**
 * @callback EventListener
 * @param {Event} event
 */


class EventProvider {

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
     * @type {Config}
     */
    config = null

    /**
     * 
     * @private
     * @type {Signal.<Event>}
     */
    eventReceiver = new Signal()


    /**
     * 
     * @param {string} namespace 
     * @param {Config} config 
     */
    constructor(namespace, config) {
        this.namespace = namespace
        this.config = config
    }

    /**
     * 
     * @protected
     * @returns {Promise.<any>}
     */
    initalize() {
        this.config.adapters.messaging.subscribe(this.namespace, 'events', this.messageHandler)
    }

    /**
     * 
     * @returns {Promise.<Array.<Event>>}
     */
    getEvents() {
        return this.config.adapters.listStorage.getAll(this.namespace).then(itemList => {
            const eventList = []
            for (let item of itemList) {
                eventList.push(new Event(item))
            }
            return eventList
        })
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
     * @returns {Promise.<any>}
     */
    emit(event) {
        return Promise.all([
            this.config.adapters.messaging.publish(this.namespace, 'events', event),
            this.config.adapters.listStorage.push(this.namespace, event)
        ])
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        return this.config.adapters.messaging.unsubscribe(this.namespace, 'events', this.messageHandler)
    }

    /**
     * 
     * @private
     * @param {any} message 
     */
    messageHandler = message => {
        const event = new Event(message)
        this.eventReceiver.dispatch(event)
    }

}

export default EventProvider