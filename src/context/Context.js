import SharedStorageAdapter from '../adapters/SharedStorageAdapter'
import MessageBrokerAdapter from '../adapters/MessageBrokerAdapter'
import LoggingAdapter from '../adapters/LoggingAdapter'
import Logger from '../interfaces/Logger'
import EventBroker from './EventBroker'
import Storage from './Storage'
import ActorProvider from './ActorProvider'
import Activity from './Activity'
import ActionHandler from './ActionHandler'


class Context {

    /**
     * 
     * @readonly
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
     * @type {Storage}
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
     * @type {Logger}
     */
    logger = null

    /**
     * 
     * @param {string} id 
     * @param {Activity} activity
     * @param {MessageBrokerAdapter} messageBrokerAdapter 
     * @param {SharedStorageAdapter} sharedStorageAdapter
     * @param {LoggingAdapter} loggingAdapter
     */
    constructor(id, activity, messageBrokerAdapter, sharedStorageAdapter, loggingAdapter) {
        this.id = id
        this.activity = activity
        this.logger = new Logger(loggingAdapter, `context-${id}`, 3)
        this.events = new EventBroker(messageBrokerAdapter, this)
        this.storage = new Storage(sharedStorageAdapter, this)
        this.actors = new ActorProvider(sharedStorageAdapter, this)
        this.actions = new ActionHandler(this)
    }

    initialize() {
        return this.events.initialize().catch(error => {
            this.logger.info('context initalized')
        })
    }

    dispose() {
        return this.events.dispose().then(() => {

        })
    }
}

export default Context