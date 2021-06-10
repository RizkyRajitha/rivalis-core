import Actor from './Actor'
import Action from './Action'
import Context from './Context'

class ActionHandler {

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @param {Context} context 
     */
    constructor(context) {
        this.context = context
    }

    /**
     * 
     * @param {Actor} actor 
     * @param {Action} action
     * @returns {Promise.<any>}
     */
    execute(actor, action) {
        // TODO: implement this
    }

    schedule(actor, action) {
        
    }

}

export default ActionHandler