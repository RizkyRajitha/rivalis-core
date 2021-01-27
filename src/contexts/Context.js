import Actor from './Actor'
import Stage from '../stages/Stage'
import Adapter from '../adapter/Adapter'
import ContextProvider from './ContextProvider'
import ActionHandler from './ActionHandler'

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
     * @type {boolean}
     */
    disposed = false

    /**
     * 
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

    execute(actor, action) {
        if (this.disposed) {
            return Promise.reject(new Error('error in context#execute, context is already disposed'))
        }
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    onInitialize() {
        return Promise.resolve().then(() => {
            return this.stage.onInit(this.actions, this.settings)
        }).then(() => {
            
        })
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    onDispose() {
        this.disposed = true
        console.log('dispose context')
    }

    /**
     * 
     * @private
     * @param {string} method
     * @returns {Promise.<any>}
     */
    canProceed(method) {
        return this.contextProvider.get(this.id).then(contextInfo => {
            if (contextInfo === null) {
                throw new Error(`error in context#${method}, context is already disposed`)
            }
        })
    }

}

export default Context