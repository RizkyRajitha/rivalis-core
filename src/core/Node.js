import RoomProvider from '../providers/RoomProvider'
import Config from './Config'
import Exception from './Exception'
import Logger from './Logger'
import LoggerFactory from '../providers/LoggerFactory'
import { isInstanceOf } from '../utils/helpers'
import Actor from './Actor'
import Clock from '../structs/Clock'

class Node {

    /**
     * @type {LoggerFactory}
     */
    logging = null

    /**
     * @type {RoomProvider}
     */
    rooms = null

    /**
     * @private
     * @type {Config}
     */
    config = null

    /**
     * @private
     * @type {Logger}
     */
    logger = null

    /**
     * @private
     * @type {Clock}
     */
    clock = null

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.config = config
    }

    async run() {
        if (typeof this.config !== 'object') {
            throw new Exception('[Node] invalid config, the provided config must be an object')
        }
        this.config = new Config(this.config)
        Config.validate(this.config)
        for (let reporter of this.config.reporters) {
            await reporter.init()
        }
        this.logging = new LoggerFactory(this.config.reporters, this.config.loggerLevel, this.config.nodeId)
        this.logger = this.logging.getLogger('node')
        this.logger.info('🏴 log reporter layer initialized!')
        await this.config.persistence.init()
        this.clock = new Clock(this.config.clockInterval)
        this.logger.info('📊 persistence layer initialized!')
        for (let transport of this.config.transports) {
            await transport.init(this)
        }
        this.logger.info('🌐 transport layer initialized!')
        this.logger.info('✔️ ready!')

        this.rooms = new RoomProvider(this)
        return this
    }

    async shutdown() {
        this.clock.dispose()
        // TODO: dispose rooms
        // print metrics
        this.logger.info('disposing persistence layer...')
        await this.config.persistence.dispose()
        this.logger.info('disposing log reporter layer...')
        for (let reporter of this.config.reporters) {
            await reporter.dispose()
        }
        this.logger.info('disposing transport layer...')
        for (let transport of this.config.transports) {
            await transport.dispose()
        }
        this.logger.info('was disposed!')
    }

    /**
     * 
     * @param {string} ticket 
     * @returns {Promise.<Actor>}
     */
    async authorize(ticket) {
        let actor = null
        try {
            actor = await this.config.auth.onAuth(ticket, this)
        } catch (error) {
            throw new Exception(`authorization failed, ${error.message}`)// TODO: implement this
        }
        if (isInstanceOf(actor, Actor)) {
            return actor
        } else {
            throw new Exception('') // TODO: write message
        }
    }
}

export default Node