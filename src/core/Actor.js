import Event from './Event'
import { Signal } from 'signals'
import VectorClock from '../structs/VectorClock'
import Activity from './Activity'
import Context from './Context'

/**
 * @callback EventListener
 * @param {Event} event
 */


// TODO: local storage
class Actor {

    /**
     * 
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * 
     * @readonly
     * @type {Object.<string,any>}
     */
    data = null

    /**
     * 
     * @type {VectorClock}
     */
    clock = null

    /**
     * 
     * @private
     * @type {Signal.<Event>}
     */
    onEvent = null

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     * @param {Context} context 
     */
    constructor(id, data, context) {
        this.id = id
        this.data = data
        this.clock = new VectorClock(id)
        this.context = context
        this.onEvent = new Signal()
        Context.getPersistence(this.context).events.subscribe(this.handleEvent, this)
        
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     * @returns {this}
     */
    add(listener, context) {
        this.onEvent.add(listener, context)
        return this
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     * @returns {this}
     */
    remove(listener, context) {
        this.onEvent.remove(listener, context)
        return this
    }

    /**
     * 
     * @param {string} key 
     * @param {any} data 
     * @returns {Promise.<any>}
     */
    execute(key, data) {
        return this.engine.context.actions.execute(this, key, data)
    }

    /**
     * 
     * @param {Event} event 
     */
    send(event) {
        this.onEvent.dispatch(event)
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        this.engine.eventBroker.unsubscribe(this.handleEvent, this)
        this.onEvent.removeAll()
        this.onEvent = null
    }

    /**
     * 
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        this.clock.update(event.getVectorClock())
        let filter = Activity.getFilter(this.engine.context.activity, event.key)
        if (filter) {
            filter(this, event, this.engine.context)
        } else {
            this.send(event)
        }
    }

}

export default Actor