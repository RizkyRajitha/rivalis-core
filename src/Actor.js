import { Signal } from 'signals'
import Context from './Stage'
import Action from './structs/Action'
import Event from './structs/Event'
import VectorClock from './structs/VectorClock'

/**
 * @callback EventListener
 * @param {Array.<Event>} events
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
    eventReceiver = null

    /**
     * 
     * @type {Array.<Event>}
     */
    eventList = []

    /**
     * 
     * @param {string} id 
     * @param {Context} context 
     */
    constructor(id, context) {
        this.id = id
        this.context = context
        this.clock = new VectorClock(id)
        this.eventReceiver = new Signal()
        this.context.events.add(this.eventHandler)
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
     * @returns {Promise.<any>}
     */
    synctronize() {
        return this.context.events.getEvents().then(eventList => {
            for (let event of eventList) {
                this.clock.update(event.getVectorClock())
                this.eventList.push(event)
            }
        })
    }

    /**
     * 
     * @param {Action} action 
     * @returns {Promise.<any>}
     */
    execute(action) {
        return this.context.execute(this, action)
    }

    /**
     * 
     */
    dispose() {
        this.context.events.remove(this.eventHandler)
        this.eventReceiver.removeAll()
    }

    /**
     * 
     * @private
     * @param {Event} event 
     */
    eventHandler = event => {
        this.clock.update(event.getVectorClock())
        event.time.push(new Date().getTime())
        this.eventList.push(event)
    }

    /**
     * 
     * @private
     */
    emitEventList() {
        const events = [ ...this.eventList ]
        this.eventList = []
        for (let event of this.eventList) {
            event.time.push(new Date().getTime())
        }
        this.eventReceiver.dispatch(events)
    }

}

export default Actor