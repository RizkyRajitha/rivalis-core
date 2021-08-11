import RoomProvider from '../providers/RoomProvider'
import Config from './Config'
import Exception from './Exception'
import Logger from './Logger'
import LoggerFactory from '../providers/LoggerFactory'

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
        this.logger.info('📊 persistence layer initialized!')
        for (let transport of this.config.transports) {
            await transport.init()
        }
        this.logger.info('🌐 transport layer initialized!')
        this.logger.info('✔️ ready!')

        this.rooms = new RoomProvider(this)
        return this
    }

    async shutdown() {
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
        // TODO: dispose rooms
        // print metrics
        this.logger.info('was disposed!')
    }
}

export default Node