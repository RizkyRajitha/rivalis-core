import Event from '../models/Event'
import MessageBroker from '../persistence/MessageBroker'
import SystemBroadcast from '../persistence/SystemBroadcast'
import DataProvider from '../providers/DataProvider'
import Codec from '../structs/Codec'
import Config from './Config'
import Logger from './Logger'
import Stage from './Stage'

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
     * @type {DataProvider}
     */
    data = null

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
     * @type {Logger}
     */
    logger = null

    /**
     * @protected
     * @type {MessageBroker.<Event>}
     */
    eventBroker = null

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
        this.eventBroker = new MessageBroker(config.persistence, id, 'events', new Codec(Event))
    }

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    async init() {
        this.data = new DataProvider(this.config.persistence, this.id)
        await this.eventBroker.initialize()
    }

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    async dispose() {
        this.data = null
        await this.eventBroker.dispose()
    }

    emit() {
        
    }
}

export default Context