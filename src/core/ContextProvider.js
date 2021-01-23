import { v4 as uuid } from 'uuid'
import KVStorageAdapter from '../adapters/KVStorageAdapter'
import ContextInfo from '../structs/Context'
import Config from '../Config'

class ContextProvider {


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
     * @param {Config} config 
     */
    constructor(config) {
        this.namespace = 'context'
        this.kvStorage = config.adapters.kvStorage
    }

    /**
     * 
     * @param {object} data
     * @param {number} maxSlots
     * @returns {Promise.<ContextInfo>}
     */
    create(settings = {}, maxSlots = 0) {
        const id = uuid()
        const data = { settings, maxSlots }
        return this.kvStorage.save(this.namespace, id, data).then(() => {
            return this.get(id)
        })
    }

    /**
     * 
     * @param {string} contextId
     * @returns {Promise.<any>} 
     */
    delete(contextId) {
        return this.kvStorage.delete(this.namespace, contextId)
    }

    /**
     * 
     * @param {ContextInfo} contextId 
     */
    get(contextId) {
        return this.kvStorage.get(this.namespace, contextId).then(data => {
            if (data === null) {
                throw new Error(`context [${contextId}] doesn't exist!`)
            }
            const { settings, maxSlots } = data
            return new ContextInfo({
                id: contextId,
                settings,
                maxSlots
            })
        })
    }

    exist(contextId) {
        return this.kvStorage.exist(this.namespace, contextId)
    }

    /**
     * 
     * @returns {Promise.<Array.<ContextInfo>>}
     */
    getAll() {
        return this.kvStorage.getAll(this.namespace).then(map => {
            const contextList = []
            let promises = []
            for (let key in map) {
                promises.push(this.get(key))      
            }
            return Promise.all(promises)
        }).then(results => results)
    }

}

export default ContextProvider