import Activity from '../core/Activity'
import Actor from '../core/Actor'
import Engine from '../engine/Engine'

class ActionManager {

    /**
     * 
     * @private
     * @type {Engine}
     */
    engine = null

    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine) {
        this.engine = engine
    }

    /**
     * 
     * @param {Actor} actor
     * @param {string} key 
     * @param {any} data
     * @returns {Promise.<any>}
     */
    execute(actor, key, data) {
        let actionHandler = Activity.getHandler(this.engine.context.activity, key)
        if (actionHandler === null) {
            return Promise.reject(new Error(`there is no action handler for key=(${key})`))
        }
        actionHandler(actor, key, data, this.engine.context)
        // TODO: error handling
    }

}

export default ActionManager