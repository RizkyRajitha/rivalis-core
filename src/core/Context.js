import Event from '../models/Event'
import MessageBroker from '../persistence/MessageBroker'
import SystemBroadcast from '../persistence/SystemBroadcast'
import SharedDataAPI from '../persistence/SharedDataAPI'
import Config from './Config'
import Logger from './Logger'
import Stage from './Stage'
import Exception from './Exception'

class Context extends SystemBroadcast {

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
        super(config.persistence, id, 'system')
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
        await this.stage.onCreate(this)
    }

    /**
     * @protected
     * @returns {Promise.<number>}
     */
    async dispose() {
        await this.stage.onDispose(this)
        this.data = null
        super.dispose()
        await this.broker.dispose()
    }

    /**
     * 
     * @param {Event} event 
     */
    emit(event) {
        // TODO: validate
        return this.broker.dispatch(event)
    }

    /**
     * @protected
     * @param {Event} event
     */
    handleEvent(event) {
        super.emit('event', event)
        this.stage.onEmit(this, event)
    }
}

export default Context