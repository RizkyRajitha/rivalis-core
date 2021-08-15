import Event from './Event'
import MessageBroker from '../persistence/MessageBroker'
import SharedDataAPI from '../persistence/SharedDataAPI'
import Config from './Config'
import Logger from './Logger'
import Stage from './Stage'
import Actor from './Actor'
import { isInstanceOf } from '../utils/helpers'
import Exception from './Exception'
import ActorProvider from '../providers/ActorProvider'

class Context {

    /**
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * @readonly
     * @type {string}
     */
    type = null

    /**
     * @readonly
     * @type {Object.<string,any>}
     */
    options = null

    /**
     * @readonly
     * @type {SharedDataAPI}
     */
    data = null

    /**
     * @readonly
     * @type {Logger}
     */
    logger = null

    /**
     * @readonly
     * @type {ActorProvider}
     */
    actors = null

    /**
     * @protected
     * @type {Config}
     */
    config = null

    /**
     * @protected
     * @type {Stage}
     */
    stage = null

    /**
     * @protected
     * @type {MessageBroker.<Event>}
     */
    broker = null

    /**
     * 
     * @param {string} id 
     * @param {string} type 
     * @param {string} options 
     * @param {Config} config 
     * @param {Stage} stage
     * @param {Logger} logger
     */
    constructor(id, type, options, config, stage, logger) {
        this.id = id
        this.type = type
        this.options = options
        this.config = config
        this.stage = stage
        this.logger = logger

        this.data = new SharedDataAPI(config.persistence, id)
        this.broker = new MessageBroker(config.persistence, id, 'events')
    }

    /**
     * @protected
     * @returns {Promise.<number>}
     */
    async init() {
        await this.broker.initialize()
        this.broker.subscribe(this.handleEvent, this)
        try {
            await this.stage.onCreate(this)
        } catch (error) {
            this.logger.warning('Stage#onCreate failed,', error.message)
        }
        this.actors = new ActorProvider(this.config, this, this.logger)
    }

    /**
     * @protected
     * @returns {Promise.<number>}
     */
    async dispose() {
        try {
            await this.stage.onDispose(this)
        } catch (error) {
            this.logger.warning('Stage#onDispose failed,', error.message)
        }
        this.data = null
        super.dispose()
        await this.broker.dispose()
    }

    /**
     * 
     * @param {Actor|Context} sender
     * @param {string} key
     * @param {any} data 
     */
    broadcast(sender, key, data = null) {
        if (!isInstanceOf(sender, Actor) && !isInstanceOf(sender, Context)) {
            throw new Exception('Context#emit failed, sender must be specified')
        }
        let event = new Event({ key, data, sender: sender.id })
        return this.broker.dispatch(event)
    }

    

    /**
     * @protected
     * @param {Event} event
     */
    handleEvent(event) {
        try {
            this.stage.onEmit(this, event)
        } catch (error) {
            this.logger.warning('Stage#onEmit failed,', error.message)
        }
    }
}

export default Context