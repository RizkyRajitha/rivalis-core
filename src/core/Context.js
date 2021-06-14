import Adapter from '../adapters/Adapter'
import ActorManager from '../api/ActorManager'
import Engine from '../engine/Engine'
import SharedStorage from '../utils/SharedStorage'
import Activity from './Activity'
import VectorClock from '../structs/VectorClock'
import Event from './Event'
import { generateID } from '../helper/generateID'
import events from './events'
import EventEmitter from 'eventemitter3'
import ActionManager from '../api/ActionManager'


/**
 * @callback EventListener
 * @param {Object.<string,any>} event
 * 
 */

class Context {

    /**
     * 
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * 
     * @readonly
     * @type {string}
     */
    instanceId = null

    /**
     * 
     * @readonly
     * @type {Activity}
     */
    activity = null

    /**
     * 
     * @type {ActorManager}
     */
    actors = null

    /**
     * 
     * @type {ActionManager}
     */
    actions = null

    /**
     * @private
     * @type {Engine}
     */
    engine = null

    /**
     * 
     * @private
     * @type {VectorClock}
     */
    clock = null

    /**
     * 
     * @private
     * @type {EventEmitter.<string,any>}
     */
    emitter = null

    /**
     * 
     * @param {string} id
     * @param {Adapter} adapter 
     */
    constructor(id, adapter) {
        this.id = id
        this.instanceId = generateID()
        this.clock = new VectorClock(this.instanceId)
        this.activity = new Activity()
        this.engine = new Engine(this, adapter)
        this.emitter = new EventEmitter()
    }

    /**
     * 
     * @param {string} event 
     * @param {EventListener} eventListener 
     * @param {any} context 
     * @returns {Context}
     */
    on(event, eventListener, context) {
        this.emitter.on(event, eventListener, context)
        return this
    }

    /**
     * 
     * @param {string} event 
     * @param {EventListener} eventListener 
     * @param {any} context 
     * @returns {Context}
     */
    off(event, eventListener, context) {
        this.emitter.off(event, eventListener, context)
        return this
    }

    initialize() {
        return this.engine.initialize().then(() => {
            this.engine.eventBroker.subscribe(this.handleEvent, this)
            this.engine.contextEventBroker.subscribe(this.handleContextEvent, this)

            this.actors = new ActorManager(this.engine)
            this.actions = new ActionManager(this.engine)
        })
    }

    terminate() {

    }

    /**
     * 
     * @param {string} namespace 
     * @param {any} data 
     */
    emit(namespace, data) {

    }

    /**
     * 
     * @type {SharedStorage.<any>}
     */
    get storage() {
        return this.engine.contextStorage
    }

    /**
     * 
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        // update context clock
    }

    /**
     * @private
     * @param {Object.<string,any>} contextEvent 
     */
    handleContextEvent(contextEvent) {
        const { namespace, data } = contextEvent
        this.emitter.emit(namespace, data)
    }
}

/**
 * @enum {string}
 */
Context.Events = {
    ACTOR_JOIN: 'actor.join',
    ACTOR_LEAVE: 'actor.leave',
    ACTOR_KICK: 'actor.kick',

    CONTEXT_INIT: 'context.init',
    CONTEXT_DISPOSE: 'context.dispose'
}

export default Context