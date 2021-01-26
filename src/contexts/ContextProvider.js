import { Signal } from 'signals'
import EventEmitter from 'eventemitter3'
import Config from '../core/Config'
import MessageBroker from '../core/MessageBroker'
import KVStore from '../core/KVStore'
import StageRegister from '../stages/StageRegister'
import { v4 as uuid } from 'uuid'

/**
 * @typedef ContextInfo
 * @property {string} id
 * @property {string} type
 * @property {object} settings
 */

 /**
  * @typedef ContextEvent
  * @property {string} type
  * @property {ContextInfo} info
  */

class ContextProvider extends EventEmitter {


    /**
     * @private
     * @type {MessageBroker.<ContextEvent>}
     */
    events = null

    /**
     * 
     * @private
     * @type {KVStore.<ContextInfo>}
     */
    storage = null

    /**
     * 
     * @private
     * @type {StageRegister}
     */
    stages = null

    /**
     * 
     * @param {Signal.<Promise>} onInit 
     * @param {Config} config 
     * @param {StageRegister} stages
     */
    constructor(onInit, config, stages) {
        this.stages = stages
        this.events = new MessageBroker(config.adapter, config.cluster, 'context')
        // onInit.dispatch(this.contextEvents.initalize())
    }

    /**
     * 
     * @param {string} type 
     * @param {object} settings 
     * @returns {Promise.<ContextInfo>}
     */
    create(type, settings = {}) {
        const stage = this.stages.get(type)
        if (stage === null) {
            return Promise.reject(new Error(`stage def [${type}] is not available`))
        }
        if (typeof settings === 'object') {
            return Promise.reject(new Error(`stage def [${type}] is not available`))
        }
        const id = uuid()
        const contextInfo = { id, type, settings }
        return this.storage.set(id, contextInfo).then(() => {
            return this.events.emit({ type: 'create', info: contextInfo })
        }).then(() => contextInfo)
    }

    /**
     * 
     * @returns {Promise.<Map.<string, ContextInfo>>}
     */
    getAll = () => this.storage.getAll()

    /**
     * 
     * @param {string} id
     * @returns {Promise.<ContextInfo|null>} 
     */
    get = (id) => this.storage.get(id)

    /**
     * 
     * @param {string} id
     * @returns {Promise.<any>} 
     */
    dispose(id) {
        let info = null
        return this.get(id).then(contextInfo => {
            if (contextInfo === null) {
                throw new Error(`context [${id}] can not be disposed, doesn't exist`)
            }
            info = contextInfo
            return this.storage.delete(id)
        }).then(() => {
            return this.events.emit({ type: 'dispose', info })
        })
    }

    obtain(contextId) {
        // create local context instance if is not present, return context instance
    }

}

export default ContextProvider