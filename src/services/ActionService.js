import Activity from '../core/Activity'
import Actor from '../core/Actor'
import Context from '../core/Context'

class ActionService {

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
     * // TODO: write description
     * 
     * @param {Context} context 
     */
    constructor(context) {
        this.context = context
    }

    /**
     * 
     * @param {Actor} actor 
     * @param {string} key 
     * @param {any} data 
     * @returns {Promise.<any>}
     */
    execute(actor, key, data) {
        let actionHandler = Activity.getHandler(this.context.activity, key)
        if (actionHandler === null) {
            return Promise.reject(new Error(`there is no action handler for key=(${key})`))
        }
        try {
            let promise = actionHandler(actor, key, data, this.context)
            if (promise instanceof Promise) {
                return promise.catch(error => {
                    error.message = `action execution failed, actor=(${actor.id}), key=(${key}), data=(${JSON.stringify(data)}) ${error.message}`
                    throw error
                })
            }
            return Promise.resolve()
        } catch (error) {
            error.message = `action execution failed, actor=(${actor.id}), key=(${key}), data=(${JSON.stringify(data)}) ${error.message}`
            return Promise.reject(error)
        }
    }

}

export default ActionService