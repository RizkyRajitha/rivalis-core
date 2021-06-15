import Adapter from '../adapters/Adapter'
import Context from '../core/Context'
import SharedStorage from '../utils/SharedStorage'
import EventBroker from './EventBroker'
import ContextEventBroker from './ContextEventBroker'
import ActorStorage from './ActorStorage'
import ContextStorage from './ContextStorage'

class Engine {

    /**
     * 
     * @type {EventBroker}
     */
    eventBroker = null

    /**
     * 
     * @type {SharedStorage.<any>}
     */
    contextStorage = null

    /**
     * 
     * @type {ActorStorage>}
     */
    actorStorage = null

    /**
     * 
     * @type {ContextEventBroker}
     */
    contextEventBroker = null

    /**
     * 
     * @type {Context}
     */
    context = null

    /**
     * @private
     * @type {Adapter}
     */
    adapter = null

    /**
     * 
     * @param {Context} context 
     * @param {Adapter} adapter
     */
    constructor(context, adapter) {
        this.context = context
        this.adapter = adapter
    }

    initialize() {
        
        this.contextStorage = new ContextStorage(this.adapter.getSharedStorageAdapter(), this.context.id)
        this.actorStorage = new ActorStorage(this.adapter.getSharedStorageAdapter(), this.context.id)
        this.eventBroker = new EventBroker(this.adapter.getMessageBrokerAdapter(), this.context.id)
        this.contextEventBroker = new ContextEventBroker(this.adapter.getMessageBrokerAdapter(), this.context.id)

        return this.eventBroker.initialize().then(() => {
            return this.contextEventBroker.initialize()
        })
    }

    dispose() {
        // TODO: implement this
    }

}

export default Engine