import Command from '../models/Command'

/**
 * Callback for handling actions
 *
 * @callback ActionListener
 * @param {Command} command
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
ActionHandler.getListener = (actionHandler, type) => {
    const nameList = type.split('.')
    const name = nameList.shift()
    if (nameList.length > 1) {
        const handler = actionHandler.handlers.get(name) || null
        if (handler === null) {
            throw new Error(`not avaiable listener for type ${type}`)
        } else {
            return ActionHandler.getListener(handler, nameList.join('.'))
        }
    } else {
        const listener = actionHandler.listeners.get(type) || null
        if (listener === null) {
            throw new Error(`not avaiable listener for type ${type}`)
        } else {
            return listener
        }

    }

}

export default ActionHandler