import Actor from './Actor'
import Stage from '../stages/Stage'
import Adapter from '../adapter/Adapter'
import ContextProvider from './ContextProvider'
import ActionHandler from './ActionHandler'
import MessageBroker from '../core/MessageBroker'
import KVStore from '../core/KVStore'
import Actor from './Actor'
import Command from '../models/Command'
import Response from '../models/Response'
import Actor from './Actor'
import Message from '../models/Message'

class Context {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {Object.<string, any>}
     */
    settings = null

    /**
     * 
     * @type {MessageBroker.<Message>}
     */
    messages = null

    /**
     * 
     * @type {KVStore.<any>}
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
     * @private
     * @type {KVStore.<string>}
     */
    actorStore = null

    /**
     * 
     * @private
     * @type {Map.<string, Actor>}
     */
    actors = null

    /**
     * 
     * @param {string} id 
     * @param {Object.<string, any>} settings 
     * @param {Stage} stage 
     * @param {Adapter} adapter 
     * @param {ContextProvider} contextProvider
     */
    constructor(id, settings, stage, adapter) {
        this.id = id
        this.settings = settings
        this.stage = stage
        this.contextProvider = contextProvider
        
        this.actions = new ActionHandler()
        this.messages = new MessageBroker(adapter, id)
        this.storage = new KVStore(adapter, id)
        
        this.actorStore = new KVStore(adapter, `actors:${id}`)
        this.actors = new Map()
    }

    /**
     * 
     * @param {string} id 
     * @param {Object.<string, any>} data
     * @returns {Promise.<Actor>} 
     */
    join(id, data = {}) {
        let actor = new Actor(id, data, this)
        return this.canProceed('join').then(() => {
            return this.stage.onJoin(this, actor)
        }).then(() => {
            return this.actorStore.exist(id)
        }).then(exist => {
            if (exist) {
                throw new Error(`actor ${id} is already in the context`)
            }
            return this.actorStore.set(id, data)
        }).then(() => {
            this.actors.set(id, actor)
            return actor
        })
    }

    /**
     * 
     * @param {Actor} actor 
     */
    leave(actor) {
        return this.canProceed('leave').then(() => {
            if (!this.actors.has(actor.id)) {
                throw new Error(`actor ${actor.id} is not locally available`)
            }
            return this.actorStore.exist(id)
        }).then(exist => {
            if (!exist) {
                this.actors.delete(actor.id)
                throw new Error(`actor ${actor.id} is not live in this context (${this.id})`)
            }
        })
    }

    /**
     * 
     * @param {Actor} actor 
     * @param {Command} command 
     * @returns {Promise.<Response|null>}
     */
    execute(actor, command) {
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
            // TODO: null all variables
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