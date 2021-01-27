import Actor from './Actor'
import Stage from '../stages/Stage'
import Adapter from '../adapter/Adapter'
import ContextProvider from './ContextProvider'
import ActionHandler from './ActionHandler'
import MessageBroker from '../core/MessageBroker'
import KVStore from '../core/KVStore'

class Context {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {object}
     */
    settings = null

    /**
     * 
     * @type {MessageBroker}
     */
    events = null

    /**
     * 
     * @type {KVStore}
     */
    storage = null

    /**
     * 
     * @private
     * @type {Stage}
     */
    stage = null

    /**
     * 
     * @private
     * @type {Adapter}
     */
    adapter = null

    /**
     * 
     * @private
     * @type {ContextProvider}
     */
    contextProvider = null

    /**
     * 
     * @private
     * @type {boolean}
     */
    disposed = false

    /**
     * 
     * @private
     * @type {ActionHandler}
     */
    actions = null

    /**
     * 
     * @param {string} id 
     * @param {object} settings 
     * @param {Stage} stage 
     * @param {Adapter} adapter 
     * @param {ContextProvider} contextProvider
     */
    constructor(id, settings, stage, adapter) {
        this.id = id
        this.settings = settings
        this.stage = stage
        this.adapter = adapter
        this.contextProvider = contextProvider
        this.actions = new ActionHandler()
        this.events = new MessageBroker(adapter, id)
        this.storage = new KVStore(adapter, id)
    }

    /**
     * 
     * @param {string} id 
     * @param {object} data
     * @returns {Promise.<Actor>} 
     */
    join(id, data = {}) {
        return this.canProceed('join')
        // TODO: execute stage join and if is succesfully executed create a connection
    }

    /**
     * 
     * @param {Actor} actor 
     */
    leave(actor) {
        // TODO: implement this
    }

    execute(actor, action) {
        if (this.disposed) {
            return Promise.reject(new Error('error in context#execute, context is already disposed'))
        }
        // TODO: implement this
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        return this.canProceed('dispose').then(() => {
            return this.contextProvider.dispose(this.id)
        })
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    onInitialize() {
        return this.events.initialize().then(() => {
            return this.stage.onInit(this.actions, this.settings)  
        })
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    onDispose() {
        this.disposed = true
        return this.events.dispose()
    }

    /**
     * 
     * @private
     * @param {string} method
     * @returns {Promise.<any>}
     */
    canProceed(method) {
        return this.contextProvider.get(this.id).then(contextInfo => {
            if (contextInfo === null || this.disposed) {
                throw new Error(`error in context#${method}, context is already disposed`)
            }
        })
    }

}

export default Context