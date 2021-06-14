import Engine from '../engine/Engine'
import Event from './Event'
import { Signal } from 'signals'
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
        this.engine = engine
        this.onEvent = new Signal()
        this.engine.eventBroker.subscribe(this.handleEvent, this)
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    add(listener, context) {

    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    remove(listener, context) {

    }

    /**
     * 
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {

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

}

export default Actor