import { emit } from 'process'
import { Signal } from 'signals'
import Context from './Context'
import Event from './Event'

/**
 * @callback EventListener
 * @param {Event} event
 */


class Actor {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {Object.<string,any>}
     */
    data = null

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @private
     * @type {Signal.<Event>}
     */
    eventReceiver = new Signal()

    constructor(id, data, context) {
        this.id = id
        this.data = data
        this.context = context
        this.context.events.subscribe(this.handleEvent, this)
    }


    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    addListener = (listener, context) => {
        this.eventReceiver.add(listener, context)
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    removeListener = (listener, context) => {
        this.eventReceiver.remove(listener, context)
    }

    /**
     * 
     * @param {Action} action 
     * @returns {Promise.<any>}
     */
    execute(action) {
        return this.context.actions.execute(this, action)
    }

    /**
     * 
     * @param {Event} event 
     */
    emit(event) {
        this.eventReceiver.dispatch(event)
    }
    
    /**
     * 
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        // TODO: filter events 
        this.emit(event)
    }

    dispose() {
        this.context.events.unsubscribe(this.handleEvent, this)
    }

}

export default Actor