class ActionHandlerRepository {

    actionHandlerMap = {}

    /**
     * 
     * @param {string} selector 
     * @param {function} actionHandler 
     */
    register(key, actionHandler) {
        if (typeof key !== 'string') {
            throw new Error('NOT IMPLEMENTED!')
        }

        if (typeof actionHandler !== 'function') {
            throw new Error('NOT IMPLEMENTED!')
        }

        this.actionHandlerMap[key] = actionHandler
    }

    /**
     * 
     * @param {string} selector
     * @param {object} action 
     */
    get(key) {
        return this.actionHandlerMap[key] || null
    }

}

export default ActionHandlerRepository