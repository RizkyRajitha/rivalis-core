import Action from '../structs/Action'

/**
 * Callback for handling actions
 *
 * @callback actionHandler
 * @param {Action} action
 * @param {string} actorId
 * @param {string} contextId
 */


class ActionHandlerGroup {

    /**
     * 
     * @private
     * @type {RegExp}
     */
    typeRegExp = new RegExp(/^[a-z0-9]+$/)

    /**
     * 
     * @private
     * @type {object}
     */
    groups = {}

    /**
     * 
     * @private
     * @type {object}
     */
    handlers = {}

    /**
     * 
     * @param {string} alias 
     * @param {ActionHandlerGroup} actionHandlerGroup
     */
    use(alias, actionHandlerGroup) {
        if (!this.typeRegExp.test(alias)) {
            throw new Error('error for invalid alias name')
        }

        if (typeof this.groups[alias] !== 'undefined') {
            throw new Error('')
        }

        if (actionHandlerGroup instanceof ActionHandlerGroup) {
            this.groups[alias] = actionHandlerGroup
        } else {
            throw new Error('invalid actionHandlerGroup')
        }
    }

    /**
     * 
     * @param {string} type 
     * @param {actionHandler} actionHandler 
     */
    on(type, actionHandler) {
        
        if (!this.typeRegExp.test(type)) {
            throw new Error('error for invalid alias name')
        }

        if (typeof this.handlers[type] !== 'undefined') {
            throw new Error('')
        }

        if (typeof actionHandler === 'function') {
            this.handlers[type] = actionHandler
        } else {
            throw new Error('invalid actionHandler')
        }
    }

}

/**
 * 
 * @param {ActionHandlerGroup} actionHandlerGroup 
 * @param {string} type 
 */
ActionHandlerGroup.getHandler = (actionHandlerGroup, type) => {
    const sections = type.split('.')
    const key = sections.shift()
    if (sections.length > 1) {
        const group = actionHandlerGroup.groups[key]
        if (!(group instanceof ActionHandlerGroup)) {
            throw new Error(`type [${type}] can not be found, group [${key}] doesn't exist`)
        } else {
            ActionHandlerGroup.getHandler(group, sections.join('.'))
        }
    } else {
        const handler = actionHandlerGroup.handlers[key]
        if (typeof handler === 'function') {
            return handler
        } else {
            throw new Error(`[${type}] can not be found, handler [${key}] doesn't exist`)
        }
    }
}

export default ActionHandlerGroup