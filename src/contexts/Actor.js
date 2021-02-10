import Action from '../models/Action'
import Message from '../models/Message'
import Context from './Context'
import VectorClock from '../utils/VectorClock'
import { Signal } from 'signals'
import EventEmitter from 'eventemitter3'

/**
 * @callback MessageListener
 * @param {Message} event
 */

class Actor {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {Object.<string, any>}
     */
    data = null

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @type {VectorClock}
     */
    clock = null

    /**
     * 
     * @private
     * @type {EventEmitter.<Message>}
     */
    emitter = null

    /**
     * 
     * @param {string} id 
     * @param {Object.<string, any>} data 
     * @param {*} context 
     */
    constructor(id, data, context) {
        this.id = id
        this.data = data
        this.context = context
        this.clock = new VectorClock(id)
        this.emitter = new EventEmitter()
        this.context.messages.addListener(this.handleMessages)
    }

    /**
     * 
     * @param {Action} action 
     * @returns {Message|null}
     */
    execute(action) {
        if (!(action instanceof Action)) {
            throw new Error('action must be an instance of Action class')
        }
        return this.context.execute(this, action)
    }

    leave() {
        return this.context.leave(this)
    }

    /**
     * 
     * @param {string} event
     * @param {MessageListener} listener 
     * @param {any} context 
     */
    on = (event, listener, context) => this.emitter.on(event, listener, context)

    /**
     * 
     * @param {string} event
     * @param {MessageListener} listener 
     * @param {any} context 
     */
    off = (event, listener, context) => this.emitter.off(event, listener, context)

    /**
     * 
     * @param {Message} message 
     */
    handleMessages = message => {
        this.clock.update(new VectorClock(message.sender, message.clock))
        this.emitter.emit('message', message)
    }

    

}

export default Actor