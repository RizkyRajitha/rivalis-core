import Actor from './Actor'
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
     * @param {string} namespace 
     * @param {any} data
     * @returns {any|Promise.<any>} 
     */
    execute(actor, namespace, data) {
        
    }

}

export default ActionHandler