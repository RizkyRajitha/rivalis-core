import { Signal } from 'signals'
import Context from '../context/Context'
import Action from '../struct/Action'
import Event from '../struct/Event'
import VectorClock from '../struct/VectorClock'

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
     * @type {VectorClock}
     */
    vectorClock = null

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

        this.context.eventBroker.add(this.processEvent)
    }

    /**
     * 
     * @param {Action} action 
     */
    execute(action) {
        if (!(action instanceof Action)) {
            throw new Error('action must be object from type Action')
        }
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
        this.vectorClock.update(new VectorClock(event.senderId, event.clock))
        setTimeout(() => {
            this.eventReceiver.dispatch(event)
        }, Math.floor(Math.random() * 1200))
        
    }

}

export default Node