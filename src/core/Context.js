import EventEmitter from 'eventemitter3'
import Event from './Event'
import Activity from './Activity'
import Adapter from '../interfaces/Adapter'
import VectorClock from '../structs/VectorClock'
import ContextEngine from '../engines/ContextEngine'
import State from '../models/State'
import ActorService from '../services/ActorService'
import ActionService from '../services/ActionService'
import EventService from '../services/EventService'

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
     * @type {ActorService}
     */
    actors = null

    /**
     * 
     * @type {ActionService}
     */
    actions = null

    /**
     * 
     * @type {EventService}
     */
    events = null

    /**
     * 
     * @private
     * @type {ContextEngine}
     */
    engine = null

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
        this.engine = new ContextEngine(this, adapter)
        this.emitter = new EventEmitter()
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        return this.engine.initialize().then(() => {
            this.engine.events.subscribe(this.handleEvent, this)
            this.engine.state.subscribe(this.handleState, this)

            this.actors = new ActorService(this.engine)
            this.actions = new ActionService(this.engine)
            this.events = new EventService(this.engine)
        })
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        this.engine.events.unsubscribe(this.handleEvent, this)
        this.engine.state.unsubscribe(this.handleState, this)
        
        // TODO: dispose API here
        
        return this.engine.dispose()
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
     * @returns {VectorClock}
     */
    getClock() {
        return this.engine.clock
    }

    /**
     * 
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        this.getClock().update(event.getVectorClock())
        this.emitter.emit(Context.State.EMIT, event)
    }

    /**
     * 
     * @private
     * @param {State} state 
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
 * @returns {ContextEngine}
 */
Context.getEngine = (context) => {
    return context.engine
}

export default Context