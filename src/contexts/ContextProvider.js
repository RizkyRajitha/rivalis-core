import { Signal } from 'signals'
import EventEmitter from 'eventemitter3'
import Config from '../core/Config'
import MessageBroker from '../core/MessageBroker'
import KVStore from '../core/KVStore'
import StageRegister from '../stages/StageRegister'
import { v4 as uuid } from 'uuid'
import Context from './Context'

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

/**
 * @callback ContextListener
 * @param {ContextInfo} contextInfo
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
     * @private
     * @type {EventEmitter}
     */
    eventEmitter = null

    /**
     * 
     * @type {Array.<Context>}
     */
    pool = []

    /**
     * 
     * @param {Signal.<Promise>} onInit 
     * @param {Config} config 
     * @param {StageRegister} stages
     */
    constructor(config, stages) {
        this.stages = stages
        this.events = new MessageBroker(config.adapter, config.cluster, 'context')
        // onInit.dispatch(this.contextEvents.initialize())
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
            return Promise.reject(new Error(`stage settings [${settings}] must be an object`))
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

    /**
     * 
     * @param {string} id
     * @returns {Promise.<Context>}
     */
    obtain(id) {
        let context = this.getObtainedContext(id)
        if (context !== null) {
            return Promise.resolve(context)
        }
        return this.get(id).then(contextInfo => {
            let stage = this.stages.get(contextInfo.type)
            if (stage === null) {
                throw new Error(`context can not be resolved, stage definition missing, type=(${contextInfo.type})`)
            }
            let context = this.getObtainedContext(id)
            if (context !== null) {
                return context
            }
            context = new Context(contextInfo.id, contextInfo.settings, stage)
            this.pool.push(context)
            return context.onInitialize()
        })
    }

    /**
     * 
     * @param {('create'|'dispose')} event 
     * @param {ContextListener} contextListener 
     */
    on(event, contextListener) {
        if (typeof event !== 'string') {
            throw new Error('event must be a string')
        }
        if (!(event === 'create' || event === 'dispose')) {
            throw new Error('invalid event type, event types available (create, dispose)')
        }
        this.eventHandler.on(event, contextListener)
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    initialize() {
        return this.events.initialize().then(() => {
            return this.events.addListener(this.handleContextEvents)
        }).then(() => undefined)
    }

    /**
     * 
     * @param {ContextEvent} contextEvent 
     */
    handleContextEvents = contextEvent => {
        this.eventEmitter.emit(contextEvent.type, contextEvent.info)
        if (contextEvent.type === 'dispose') {
            let context = this.getObtainedContext(contextEvent.info.id)
            if (context !== null) {
                context.onDispose().then(() => {
                    this.pool = this.pool.filter(item => item.id !== context.id)
                })
                
            }
        }
    }

    /**
     * 
     * @private
     * @param {string} id
     * @returns {Context|null}
     */
    getObtainedContext(id) {
        for (let context of this.pool) {
            if (id === context.id) {
                return context
            }
        }
    }

}

/**
 * 
 * @enum {string}
 */
ContextProvider.EventType = EventType

export default ContextProvider