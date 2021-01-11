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
     * @type {Signal.<Event>}
     */
    eventReceiver = new Signal()

    constructor(nodeId, context) {
        this.id = nodeId
        this.clock = new VectorClock(nodeId)
        this.context = context
        this.context.eventBroker.add(this.processEvent)
    }

    sync() {
        this.context.eventStorage.getAll().then(eventList => {
            for (let event of eventList) {
                this.eventReceiver.dispatch(event)
            }
        })
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
        this.eventReceiver.dispatch(event)
    }
}

export default Node