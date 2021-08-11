import Config from './Config'
import Context from './Context'
import Logger from './Logger'
import Stage from './Stage'

class Room extends Context {

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
        this.logger.trace('initialized properly!')
    }

    /**
     * @returns {Promise.<void>}
     */
    async dispose() {
        await super.dispose()
        this.logger.trace('disposed!')
    }

}

export default Room