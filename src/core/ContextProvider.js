import { v4 as uuid } from 'uuid'
import KVStorageAdapter from '../adapters/KVStorageAdapter'
import ContextInfo from '../structs/ContextInfo'
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
        let contextData = null
        return this.kvStorage.get(this.namespace, contextId).then(data => {
            if (data === null) {
                throw new Error('NOT IMPLEMENTED!')
            }
            contextData = data
            return this.getActiveSlots(contextId)
        }).then(activeSlots => {
            const { settings, maxSlots } = contextData
            return new ContextInfo({
                id: contextId,
                settings,
                maxSlots,
                activeSlots
            })
        })
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

    /**
     * 
     * @param {string} contextId 
     * @param {string} agentId
     * @returns {Promise.<string>} 
     */
    obtainSlot(contextId, agentId) {
        const namespace = `slots-${contextId}`
        const token = uuid()
        return this.kvStorage.save(namespace, agentId, token).then(() => {
            return this.kvStorage.expire(namespace, agentId, 2000)
        }).then(() => token)

    }

    /**
     * 
     * @private
     * @param {string} contextId 
     * @param {string} actorId 
     * @param {string} token 
     * @param {number} ttl 
     * @returns {Promise.<any>}
     */
    retainSlot(contextId, actorId, token, ttl = 2000) {
        const namespace = `slots-${contextId}`
        return 
    }

    /**
     * 
     * @private
     * @returns {Promise.<string>}
     */
    getActiveSlots(contextId) {
        const namespace = `slots-${contextId}`
        return this.kvStorage.getAll(namespace).then(map => {
            const activeSlots = []
            for (let key in map) {
                activeSlots.push(key)
            }
            return activeSlots
        })
    }

}

export default ContextProvider