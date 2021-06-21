import Event from './Event'
import { Signal } from 'signals'
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
     * @private
     * @type {VectorClock}
     */
    clock = null

    /**
     * @private
     * @type {Signal.<Event>}
     */
    onEvent = null

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
        this.onEvent = new Signal()
        Context.getEngine(this.context).events.subscribe(this.handleEvent, this)
        
    }

    /**
     * Actor#add method can be used for registering a listener for the events applicable for this actor
     * @param {EventListener} listener 
     * @param {any} context 
     * @returns {this}
     */
    add(listener, context) {
        this.onEvent.add(listener, context)
        return this
    }

    /**
     * Actor#remove method can remove already registered listener
     * @param {EventListener} listener 
     * @param {any} context 
     * @returns {this}
     */
    remove(listener, context) {
        this.onEvent.remove(listener, context)
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
        this.onEvent.dispatch(event)
    }

    /**
     * Actor#getClock can be used to get reference of actor's clock
     * @returns {VectorClock}
     */
    getClock() {
        return this.clock
    }

    /**
     * @private
     * @returns {Promise.<any>}
     */
    dispose() {
        Context.getEngine(this.context).events.unsubscribe(this.handleEvent, this)
        this.onEvent.removeAll()
        this.onEvent = null
    }

    /**
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        this.clock.update(event.getVectorClock())
        let filter = Activity.getFilter(this.context, event.key)
        if (filter) {
            filter(this, event, this.engine.context)
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
Actor.dispose = (actor) => {
    actor.dispose()
}

export default Actor