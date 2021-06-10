import SharedStorageAdapter from '../adapters/SharedStorageAdapter'
import MessageBrokerAdapter from '../adapters/MessageBrokerAdapter'
import EventBroker from './EventBroker'
import Storage from './Storage'
import ActorProvider from './ActorProvider'
import Activity from './Activity'
import ActionHandler from './ActionHandler'


class Context {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {Activity}
     */
    activity = null

    /**
     * 
     * @type {EventBroker}
     */
    events = null

    /**
     * 
     * @type {SharedStorage.<any>}
     */
    storage = null

    /**
     * 
     * @type {ActorProvider}
     */
    actors = null

    /**
     * 
     * @type {ActionHandler}
     */
    actions = null

    /**
     * 
     * @param {string} id 
     * @param {Activity} activity
     * @param {MessageBrokerAdapter} messageBrokerAdapter 
     * @param {SharedStorageAdapter} sharedStorageAdapter
     */
    constructor(id, activity, messageBrokerAdapter, sharedStorageAdapter) {
        this.id = id
        this.activity = activity
        this.events = new EventBroker(messageBrokerAdapter, id)
        this.storage = new Storage(sharedStorageAdapter, id)
        this.actors = new ActorProvider(sharedStorageAdapter, this)
        this.actions = new ActionHandler(this)
    }

    initialize() {
        return this.events.initialize().catch(error => {
              
        })
    }

    dispose() {
        return this.events.dispose().then(() => {

        })
    }
}

export default Context