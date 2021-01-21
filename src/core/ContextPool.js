import Context from '../Context'
import ContextInfo from '../structs/ContextInfo'
import ContextProvider from './ContextProvider'
import ActionHandlerGroup from './ActionHandlerGroup'
import Config from '../Config'

class ContextPool {

    /**
     * 
     * @private
     * @type {Config}
     */
    config = null

    /**
     * 
     * @private
     * @type {ContextProvider}
     */
    contextProvider = null

    /**
     * 
     * @private
     * @type {ActionHandlerGroup}
     */
    actionHandlerGroup = null

    /**
     * 
     * @param {Config} config
     * @param {ContextProvider} contextProvider 
     * @param {ActionHandlerGroup} actionHandlerGroup 
     */
    constructor(config, contextProvider, actionHandlerGroup) {
        this.config = config
        this.contextProvider = contextProvider
        this.actionHandlerGroup = actionHandlerGroup
    }

    /**
     * 
     * @param {ContextInfo} contextInfo
     * @returns {Promise.<Context>}
     */
    get(contextInfo) {
        this.contextProvider.get(contextInfo.id).then(contextInfo => {
            if (contextInfo === null) {
                throw new Error('')
            }
            const context = new Context(contextInfo.id, this.actionHandlerGroup, this.config)
            // TODO: save to the pool
        })
    }
}

export default ContextPool