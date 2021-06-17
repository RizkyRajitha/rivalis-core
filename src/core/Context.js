import EventEmitter from 'eventemitter3'
import Event from './Event'
import Activity from './Activity'
import Adapter from '../interfaces/Adapter'
import VectorClock from '../structs/VectorClock'
import ContextPersistence from '../persistence/ContextPersistence'

/**
 * @callback StateListener
 * @param {Object.<string,any>} event
 * 
 */

class Context extends Activity {

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
     * @private
     * @type {ContextPersistence}
     */
    persistence = null

    /**
     * 
     * @private
     * @type {EventEmitter}
     */
    emitter = null


    /**
     * 
     * @param {string} id 
     * @param {Adapter} adapter 
     */
    constructor(id, adapter) {
        super()
        this.id = id
        this.clock = new VectorClock(id)
        this.persistence = new ContextPersistence(this, adapter)
        this.emitter = new EventEmitter()
    }

    /**
     * 
     * @param {string} state 
     * @param {StateListener} stateListener 
     * @param {any} context 
     * @returns {this}
     */
    on(state, stateListener, context) {
        this.emitter.on(state, stateListener, context)
        return this
    }

    /**
     * 
     * @param {string} state 
     * @param {StateListener} stateListener 
     * @param {any} context 
     * @returns 
     */
    off(state, stateListener, context) {
        this.emitter.off(state, stateListener, context)
        return this
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        return this.persistence.initialize().then(() => {
            this.persistence.events.subscribe(this.handleEvent, this)
            this.persistence.state.subscribe(this.handleState, this)

            // TODO: initialize API here
        })
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        this.persistence.events.unsubscribe(this.handleEvent, this)
        this.persistence.state.unsubscribe(this.handleState, this)
        return this.persistence.dispose().then(() => {
            // TODO: dispose API here
        })
    }

    /**
     * 
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        this.clock.update(event.getVectorClock())
        this.emitter.emit(Context.State.EMIT, event)
    }

    /**
     * 
     * @private
     * @param {import('./persistence/StateBroker').State} state 
     */
    handleState(state) {
        const { key, data } = state
        this.emitter.emit(key, data)
    }
}

/**
 * @enum {string}
 */
Context.State = {
    ACTOR_JOIN: 'actor.join',
    ACTOR_LEAVE: 'actor.leave',
    ACTOR_KICK: 'actor.kick',

    INIT: 'init',
    DISPOSE: 'dispose',
    EMIT: 'emit'
}

/**
 * 
 * @param {Context} context 
 * @returns {ContextPersistence}
 */
Context.getPersistence = (context) => {
    return context.persistence
}

export default Context