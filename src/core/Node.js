import RoomProvider from '../providers/RoomProvider'
import Config from './Config'
import Exception from './Exception'
import Logger from './Logger'
import LoggerFactory from '../providers/LoggerFactory'
import { isInstanceOf } from '../utils/helpers'
import Actor from './Actor'
import Clock from '../structs/Clock'
import Plugin from './Plugin'

class Node {

    /**
     * @type {RoomProvider}
     */
    rooms = null

    /**
     * @private
     * @type {LoggerFactory}
     */
    logging = null

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
     * @private
     * @type {Array.<Plugin>}
     */
    plugins = null

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.config = config
    }


    /**
     * 
     * @returns {Promise.<void>}
     */
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
        this.plugins = []
        this.clock = new Clock(this.config.clockInterval || 1000)
        this.rooms = new RoomProvider(this)
        return this
    }

    /**
     * @returns {Promise.<void>}
     */
    async shutdown() {
        this.clock.dispose()
        for (let room of this.rooms.list) {
            await this.rooms.omit(room)
        }
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
        for (let plugin of this.plugins) {
            await plugin.dispose()
        }
        this.plugins = null
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
            throw new Exception(`authorization failed, ${error.message}`)
        }
        if (isInstanceOf(actor, Actor)) {
            return actor
        } else {
            throw new Exception('AuthResolver#onAuth must return an instance of Actor')
        }
    }

    /**
     * 
     * @param {Plugin} plugin 
     * @returns {Promise.<void>}
     */
    async register(plugin) {
        if (!isInstanceOf(plugin, Plugin)) {
            throw new Exception('plugin must be an instance of Plugin')
        }
        this.plugins.push(plugin)
        return plugin.init(this, this.clock)
    }
}

export default Node