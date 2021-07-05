import EventEmitter from 'eventemitter3'
import Event from './Event'
import VectorClock from '../structs/VectorClock'
import Activity from './Activity'
import Context from './Context'

/**
 * @callback EventListener
 * @param {Event} event
 */

/**
 * @class
 */
class Actor {

    /**
     * unique actor identifier
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * custom data passed to actor that defines some actor properties
     * @readonly
     * @type {Object.<string,any>}
     */
    data = null

    /**
     * key-value actor storage used for caching a data for further use
     * @readonly
     * @type {Map.<string,any>}
     */
    cache = null

    /**
     * @readonly
     * @type {VectorClock}
     */
    clock = null


    

    /**
     * @private
     * @type {EventEmitter}
     */
    emitter = null

    /**
     * @private
     * @type {Context}
     */
    context = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * Actor represents unit that is directly controlled by the user.
     * For example, if you are building game, the actor shall be the player inside your game.
     * Avoid instancing this class. Context class provides interface for properly instancing actors.
     * 
     * @param {string} id unique actor identifier
     * @param {Object.<string,any>} data custom actor properties
     * @param {Context} context context instance where your actor lives
     */
    constructor(id, data, context) {
        this.id = id
        this.data = data
        this.cache = new Map()
        this.clock = new VectorClock(id)
        this.context = context
        this.emitter = new EventEmitter()
        Context.getSync(this.context).events.subscribe(this.handleEvent, this)
        
    }

    /**
     * Actor#on method can be used for registering a listener for the events applicable for this actor
     * @param {string} topic
     * @param {EventListener} listener 
     * @param {any} context 
     * @returns {this}
     */
    on(topic, listener, context) {
        this.emitter.on(topic, listener, context)
        return this
    }

    /**
     * Actor#off method can remove already registered listener
     * @param {string} topic
     * @param {EventListener} listener 
     * @param {any} context 
     * @returns {this}
     */
    off(topic, listener, context) {
        this.emitter.off(topic, listener, context)
        return this
    }

    /**
     * Actor#execute method executes action in the context
     * @param {string} key 
     * @param {any} data 
     * @returns {Promise.<any>}
     */
    execute(key, data) {
        return this.context.actions.execute(this, key, data)
    }

    /**
     * Actor#send method can be used to send event directly to the actor
     * @param {Event} event 
     */
    send(event) {
        this.emitter.emit('event', event)
        return this
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    leave() {
        return this.context.actors.leave(this)
    }

    /**
     * @private
     * @returns {Promise.<any>}
     */
    dispose() {
        Context.getSync(this.context).events.unsubscribe(this.handleEvent, this)
        this.emitter.emit('dispose')
        this.emitter.removeAllListeners()
        this.emitter = null
    }

    /**
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        this.clock.update(event.getVectorClock())
        let filter = Activity.getFilter(this.context.activity, event.key)
        if (filter) {
            filter(this, event, this.context)
        } else {
            this.send(event)
        }
    }

}

/**
 * Actor#dispose static method is used only by the context,
 * avoid calling this directly
 * @param {Actor} actor
 */
Actor.dispose = actor => {
    actor.dispose()
}

Actor.Topic = {
    EVENT: 'event',
    DISPOSE: 'dispose'
}

/**
 * 
 * @param {Actor} actor 
 * @returns {Context}
 */
Actor.getContext = actor => {
    return actor.context
}

export default Actor