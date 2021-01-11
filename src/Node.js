import { Signal } from 'signals'
import Context from './Context'
import Event from './structs/Event'
import VectorClock from './structs/VectorClock'

/**
 * @callback EventListener
 * @param {Event} event
 */

class Node {

    /**
     * 
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * 
     * @readonly
     * @type {VectorClock}
     */
    clock = null

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @private
     * @type {boolean}
     */
    synchronized = false

    /**
     * 
     * @private
     * @type {Array.<Events>}
     */
    receivedEvents = []

    /**
     * 
     * @private
     * @type {Signal.<Event>}
     */
    eventReceiver = new Signal()

    constructor(nodeId, context) {
        this.id = nodeId
        this.clock = new VectorClock(nodeId)
        this.context = context
        this.context.eventBroker.add(this.processEvent)
    }

    execute(action) {
        //TODO: implement this
        console.log('execute', type, data)
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
    processEvent = event => {
        this.clock.update(event.getVectorClock())
        if (!this.synchronized) {
            this.receivedEvents.push(event)
        } else {
            this.eventReceiver.dispatch(event)
        }
    }
}

export default Node