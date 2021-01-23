import Context from '../Stage'
import ContextInfo from '../structs/Context'
import ContextProvider from './ContextProvider'
import ActionHandlerGroup from './ActionHandlerGroup'
import Config from '../Config'

class StageProvider {

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
    get(contextId) {
        return this.contextProvider.get(contextId).then(contextInfo => {
            if (contextInfo === null) {
                throw new Error('context no exist')
            }
            const context = new Context(contextInfo.id, this.actionHandlerGroup, this.config)
            // TODO: save to the pool
            return context
        })
    }
}

export default StageProvider