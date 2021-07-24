import Logger from './Logger'
import LogReporter from '../interfaces/LogReporter'

class LoggerFactory {

    /**
     * @type {number}
     */
    level = null

    /**
     * @private
     * @type {Map.<string,Logger>}
     */
    loggers = null

    /**
     * @private
     * @type {Array.<LogReporter>}
     */
    reporters = null

    /**
     * 
     * @param {Array.<LogReporter>} reporters 
     */
    constructor(reporters) {
        this.level = Logger.LEVEL.INFO
        this.loggers = new Map()
        this.reporters = reporters || []
    }

    /**
     * 
     * @param {string} namespace 
     */
    getLogger(namespace) {
        if (!this.loggers.has(namespace)) {
            let logger = new Logger(this, namespace)
            this.loggers.set(namespace, logger)
        }
        return this.loggers.get[namespace]
    }

}

export default LoggerFactory