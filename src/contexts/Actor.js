import EventEmitter from 'eventemitter3'
import Command from '../models/Command'
import Message from '../models/Message'
import Context from './Context'

/**
 * @callback ActorListener
 * @param {any} data
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
     * @param {string} id 
     * @param {Object.<string, any>} data 
     * @param {*} context 
     */
    constructor(id, data, context) {
        this.id = id
        this.data = data
        this.context = context
    }

    /**
     * 
     * @param {Command} command 
     */
    execute(command) {
        if (!(command instanceof Command)) {
            throw new Error('command must be an instance of Command class')
        }
        return this.context.execute(this, command)
    }

    leave() {
        this.context.leave(this)
    }

    

}

export default Actor