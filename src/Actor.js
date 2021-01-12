import { Signal } from 'signals'
import Context from './Context'
import Event from './structs/Event'
import VectorClock from './structs/VectorClock'

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
     * @type {VectorClock}
     */
    clock = null
    
    /**
     * 
     * @protected
     * @type {Context}
     */
    context = null

    /**
     * @protected
     * @type {Signal.<Event>}
     */
    eventDispatcher = Signal()

    /**
     * 
     * @param {string} id 
     * @param {Context} context 
     */
    constructor(id, context) {
        this.id = id
        this.context = context
        this.clock = new VectorClock(id)
        this.context.events.add(this.eventReceiver)
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {object} context 
     */
    add = (listener, context) => this.eventDispatcher.add(listener, context)

    /**
     * 
     * @param {EventListener} listener 
     * @param {object} context 
     */
    remove = (listener, context) => this.eventDispatcher.remove(listener, context)

    /**
     * 
     * @returns {Promise.<any>}
     */
    synctronize() {
        return this.context.events.getEvents().then(eventList => {
            for (let event of eventList) {
                this.eventReceiver(event)
            }
        })
    }

    /**
     * 
     */
    dispose() {
        this.context.events.remove(this.eventReceiver)
    }

    /**
     * 
     * @private
     * @param {Event} event 
     */
    eventReceiver = event => {
        this.clock.update(event.getVectorClock())
        this.eventDispatcher.dispatch(event)
    }

}

export default Actor