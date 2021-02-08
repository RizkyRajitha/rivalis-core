import Stage from '../stages/Stage'
import Adapter from '../adapters/Adapter'
import ContextProvider from './ContextProvider'
import ActionHandler from './ActionHandler'
import MessageBroker from '../core/MessageBroker'
import KVStorage from '../core/KVStorage'
import Action from '../models/Action'
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
     * @type {KVStorage.<any>}
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
     * @type {KVStorage.<string>}
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
    constructor(id, settings, stage, adapter, contextProvider) {
        this.id = id
        this.settings = settings
        this.stage = stage
        this.contextProvider = contextProvider
        
        this.actions = new ActionHandler()
        this.messages = new MessageBroker(adapter, id)
        this.storage = new KVStorage(adapter, id)
        
        this.actorStore = new KVStorage(adapter, `actors:${id}`)
        this.actors = new Map()
    }

    /**
     * 
     * TODO: fix joining with same id
     * @param {string} id 
     * @param {Object.<string, any>} data
     * @returns {Promise.<Actor>} 
     */
    join(id, data = {}) {
        let actor = new Actor(id, data, this)
        return this.canProceed('join').then(() => {
            return this.stage.onJoin(this, actor)
        }).then(() => {
            return this.actorStore.save(id, data)
        }).then(executed => {
            if (!executed) {
                throw new Error(`actor ${id} is already in the context`)
            }
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
            return this.actorStore.exist(actor.id)
        }).then(exist => {
            if (!exist) {
                throw new Error(`actor ${actor.id} is not a part of this context (${this.id})`)
            }
            return this.stage.onLeave(this, actor)
        }).then(() => {
            // TODO:  send an event for connector disconnection
            return this.actors.delete(actor.id)
        })
    }

    /**
     * 
     * @param {Actor} actor 
     * @param {Action} action 
     * @returns {Promise.<Response|null>}
     */
    execute(actor, action) {
        return this.canProceed('execute').then(() => {

        })
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
        return this.messages.initialize().then(() => {
            return this.stage.onInit(this.actions, this.settings)  
        }).then(() => this)
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    onDispose() {
        this.disposed = true
        return this.messages.dispose().then(() => {
            this.actors.forEach(actor => {
                // TODO:  send an event for connector disconnection
            })
            this.actors.clear()
        })
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