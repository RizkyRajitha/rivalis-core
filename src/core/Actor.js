import Engine from '../engine/Engine'
import Event from './Event'
import { Signal } from 'signals'
import Context from './Context'
import VectorClock from '../structs/VectorClock'
import Activity from './Activity'

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
     * @type {Signal.<Event>}
     */
    onEvent = null

    /**
     * 
     * @private
     * @type {Engine}
     */
    engine = null

    /**
     * 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     * @param {Engine} engine 
     */
    constructor(id, data, engine) {
        this.id = id
        this.data = data
        this.clock = new VectorClock(id)
        this.engine = engine
        this.onEvent = new Signal()
        this.engine.eventBroker.subscribe(this.handleEvent, this)
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