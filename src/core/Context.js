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
import DataStorage from '../storages/DataStorage'

/**
 * @callback StateListener
 * @param {Object.<string,any>} event
 */


/**
 * @class
 * @extends {Activity}
 */
class Context extends Activity {

    /**
     * unique context identifier
     * @type {string}
     */
    id = null

    /**
     * provides API for managing actors of the context
     * @type {ActorService}
     */
    actors = null

    /**
     * provides API for managing actions of the context
     * @type {ActionService}
     */
    actions = null

    /**
     * provides API for managing events of the context
     * @type {EventService}
     */
    events = null

    /**
     * @private
     * @type {ContextEngine}
     */
    engine = null

    /**
     * @private
     * @type {EventEmitter}
     */
    emitter = null


    /**
     * 
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * Context instance represents space where your actors and business logic are alive.
     * It is responsible for providing API for managing actors, actions, events, activities and emitting states.
     * Context instance must be initialized before using.
     * 
     * @param {string} id unique context identifier
     * @param {Adapter} adapter adapter used for storing and sharing data
     */
    constructor(id, adapter) {
        super()
        this.id = id
        this.engine = new ContextEngine(this, adapter)
        this.emitter = new EventEmitter()
    }

    /**
     * Context#initialize method must be invoked before using the context instance.
     * This method starts the important instance procedures.
     * @returns {Promise.<any>}
     */
    initialize() {
        return this.engine.initialize().then(() => {
            this.engine.events.subscribe(this.handleEvent, this)
            this.engine.state.subscribe(this.handleState, this)

            this.actors = new ActorService(this.engine)
            this.actions = new ActionService(this.engine)
            this.events = new EventService(this.engine)
            this.emitter.emit(Context.State.INIT, this)
        })
    }

    /**
     * Context#dispose method can be used to dispose the context and all inner procedures
     * @returns {Promise.<any>}
     */
    dispose() {
        this.engine.events.unsubscribe(this.handleEvent, this)
        this.engine.state.unsubscribe(this.handleState, this)
        this.actors = null
        this.actions = null
        this.events = null
        return this.engine.dispose().then(() => {
            this.emitter.emit(Context.State.DISPOSE, this)
        })
    }

    /**
     * provides shared storage on context level
     * @type {DataStorage}
     */
    get data() {
        return this.engine.data
    }

    /**
     * Context#on method can be used for registring a listener on any context state
     * possible context states are listed under Context.State enumeration
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
     * Context#off method can be used for removing already registered listener
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
     * Context#getClock method retreives a reference of context vector clock
     * @returns {VectorClock}
     */
    getClock() {
        return this.engine.clock
    }

    /**
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        this.getClock().update(event.getVectorClock())
        this.emitter.emit(Context.State.EMIT, event)
    }

    /**
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