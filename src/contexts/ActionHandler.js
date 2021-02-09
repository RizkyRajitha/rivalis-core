/**
 * Callback for handling actions
 *
 * @callback ActionListener
 * @param {Action} action
 * @param {string} actorId
 * @param {KVStorage} storage
 * @returns {Response}
 */

class ActionHandler {

    /**
     * 
     * @private
     * @type {RegExp}
     */
    nameRegExp = new RegExp(/^[a-z0-9]+$/)

    /**
     * 
     * @private
     * @type {Map.<string, ActionHandler>}
     */
    handlers = null

    /**
     * 
     * @private
     * @type {Map.<string, ActionListener>}
     */
    listeners = null

    constructor() {
        this.handlers = new Map()
        this.listeners = new Map()
    }

    /**
     * 
     * @param {string} name 
     * @param {ActionHandler} actionHandler
     */
    use(name, actionHandler) {
        if (!this.nameRegExp.test(name)) {
            throw new Error('error for invalid name')
        }

        if (this.handlers.has(name)) {
            throw new Error('actionHandler hehe 2')
        }

        if (actionHandler instanceof ActionHandler) {
            this.handlers.set(name, actionHandler)
        } else {
            throw new Error('invalid actionHandler')
        }
    }

    /**
     * 
     * @param {string} type 
     * @param {ActionListener} actionListener 
     */
    on(name, actionListener) {
        
        if (!this.nameRegExp.test(name)) {
            throw new Error('error for invalid name listener')
        }

        if (this.listeners.has(name)) {
            throw new Error('listener error 2')
        }

        if (typeof actionListener === 'function') {
            this.listeners.set(name, actionListener)
        } else {
            throw new Error('invalid actionListener')
        }
    }
}

/**
 * 
 * @param {ActionHandler} actionHandler 
 * @param {string} type 
 * @returns {ActionListener}
 */
ActionHandler.getHandler = (actionHandler, type) => {
    const nameList = type.split('.')
    if (nameList.length > 1) {
        const name = nameList.shift()
        const handler = actionHandler.handlers.get(name) || null
        if (handler === null) {
            return null
        } else {
            return ActionHandler.getHandler(handler, nameList.join('.'))
        }
    } else {
        const listener = actionHandler.listeners.get(type) || null
        
        if (listener === null) {
            return null
        } else {
            return listener
        }

    }

}

export default ActionHandler