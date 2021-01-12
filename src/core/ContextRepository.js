import Context from '../Context'
import { v4 as uuid } from 'uuid'
import KVStorageAdapter from '../adapters/KVStorageAdapter'
import ContextInfo from '../structs/ContextInfo'
import Rivalis from '../Rivalis'

class ContextRepository {


    /**
     * 
     * @protected
     * @readonly
     * @type {string}
     */
    namespace = null

    /**
     * @protected
     * @type {KVStorageAdapter}
     */
    kvStorage = null

    /**
     * @protected
     * @type {object}
     */
    contextMap = {}

    /**
     * 
     * @protected
     * @type {Rivalis}
     */
    rivalis = null

    /**
     * 
     * @param {Rivalis} rivalis 
     */
    constructor(rivalis) {
        this.namespace = 'context'
        this.rivalis = rivalis
        this.kvStorage = rivalis.config.adapters.kvStorage
    }

    /**
     * 
     * @param {ContextInfo} contextInfo
     * @returns {Promise.<ContextInfo>}
     */
    createContext(contextInfo) {
        contextInfo = new ContextInfo(contextInfo)
        contextInfo.id = uuid()
        return this.kvStorage.save(this.namespace, contextInfo.id, contextInfo).then(() => {
            return contextInfo
        })
    }

    /**
     * 
     * @param {string} contextId
     * @returns {Promise.<any>} 
     */
    deleteContext(contextId) {
        return this.kvStorage.delete(this.namespace, contextId)
    }

    getContext(contextId) {
        return this.kvStorage.get(this.namespace, contextId).then(contextInfo => {
            return new ContextInfo(contextInfo)
        })
    }

    /**
     * 
     * @returns {Promise.<Array.<ContextInfo>>}
     */
    getAllContexts() {
        return this.kvStorage.getAll(this.namespace).then(map => {
            const contextList = []
            for (let key in map) {
                contextList.push(new ContextInfo(map[key]))
            }
            return contextList
        })
    }

    /**
     * 
     * @param {ContextInfo} contextInfo 
     * @returns {Context}
     */
    resolve(contextInfo) {
        const { id: contextId } = contextInfo
        let context = this.contextMap[contextId]
        if (context instanceof Context) {
            return Promise.resolve(context)
        }
        
        let context = null
        return this.kvStorage.exist(this.namespace, contextInfo.id).then(exist => {
            if (!exist) {
                throw new Error(`context with id (${contextInfo.id}) doesn't exist!`)
            }
            return this.kvStorage.get(this.namespace, contextInfo.id)
        }).then(data => {
            contextInfo = new ContextInfo(data)
            context = new Context(contextInfo, this.rivalis)
            this.contextMap[contextInfo.id] = context
            return context.initalize()
        }).then(() => context)
    }

}

export default ContextRepository