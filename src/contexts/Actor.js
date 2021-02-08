import Action from '../models/Action'
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
     * @param {Action} action 
     */
    execute(action) {
        if (!(action instanceof Action)) {
            throw new Error('action must be an instance of Action class')
        }
        return this.context.execute(this, action)
    }

    leave() {
        this.context.leave(this)
    }

    

}

export default Actor