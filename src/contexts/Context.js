import ActionHandler from './ActionHandler'
import Actor from './Actor'
import ActorProvider from './ActorProvider'
import StorageProvider from '../core/KVStorage'
import EventProvider from './EventProvider'

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
    settings = {}

    /**
     * 
     * @private
     * @type {ActionHandler}
     */
    actions = null

    /**
     * 
     * @type {ActorProvider}
     */
    actors = null

    /**
     * 
     * @type {StorageProvider}
     */
    storage = null

    /**
     * 
     * @type {EventProvider}
     */
    events = null

    constructor(contextId, settings, stage, adapter) {
        this.id = contextId
        this.settings = settings
        this.actions = new ActionHandler()
        this.actors = new ActorProvider(adapter)
        this.storage = new StorageProvider(adapter)
        this.events = new EventProvider(adapter)
    }

    /**
     * 
     * @param {string} id 
     * @param {object} data
     * @returns {Actor} 
     */
    join(id, data = {}) {
        // TODO: execute stage join and if is succesfully executed create a connection
    }

    dispose() {
        
    }

    execute(actor, action) {

    }

}

export default Context