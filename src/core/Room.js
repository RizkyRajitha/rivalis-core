import ActorProvider from '../providers/ActorProvider'
import Config from './Config'
import Context from './Context'
import Logger from './Logger'
import Stage from './Stage'

class Room extends Context {

    
    /**
     * @readonly
     * @type {ActorProvider}
     */
    actors = null

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
        super(id, type, options, config, stage, logger)
    }

    /**
     * @returns {Promise.<void>}
     */
    async init() {
        await super.init()
        this.actors = new ActorProvider(this.config, this, this.logger)
        this.logger.trace(`room id=(${this.id}) type=(${this.type}) options=(${JSON.stringify(this.options)}) initialized!`)
    }

    /**
     * @returns {Promise.<void>}
     */
    async dispose() {
        await super.dispose()
        this.logger.trace('disposed!')
    }

    /**
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        super.handleEvent(event)
        this.logger.debug('event', event)
        // todo: here shall be 
    }

}

export default Room