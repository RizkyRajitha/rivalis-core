import { Signal } from 'signals'
import Context from '../context/Context'
import Action from '../models/Action'
import Event from '../models/Event'
import VectorClock from './VectorClock'

/**
 * @callback EventCallback
 * @param {Event} event
 */

class Node {

    /**
     * @type {string}
     */
    id = null

    /**
     * @private
     * @type {VectorClock}
     */
    vectorClock = null

    // TODO: implement event stack

    /**
     * @private
     * @type {Context}
     */
    context = null

    /**
     * @private
     * @type {Signal<Event>}
     */
    eventReceiver = new Signal()

    /**
     * 
     * @param {string} id 
     * @param {Context} context 
     */
    constructor(id, context) {
        this.id = id
        this.context = context
        this.vectorClock = new VectorClock(id)

        this.context.messageBroker.add(this.processEvent)
    }

    /**
     * 
     * @param {Action} action 
     */
    execute(action) {
        this.context.executeAction(this, action)
    }

    /**
     * 
     * @param {EventCallback} callback 
     * @param {Object} context 
     */
    add(callback, context) {
        this.eventReceiver.add(callback, context)
    }

    /**
     * 
     * @param {EventCallback} callback 
     * @param {Object} context 
     */
    addOnce(callback, context) {
        this.eventReceiver.addOnce(callback, context)
    }

    /**
     * @private
     * @param {Event} event 
     */
    processEvent = event => {
        this.eventReceiver.dispatch(event)
    }

}

export default Node