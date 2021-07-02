import LogReporter from '../interfaces/LogReporter'
import BasicLogReporter from './BasicLogReporter'
import Logger from './Logger'

class LoggingFactory {

    /**
     * @type {number}
     */
    level = null

    /**
     * @private
     * @type {Map.<string,Logger>}
     */
    loggerMap = null

    /**
     * @private
     * @type {LogReporter}
     */
    reporter = null

    constructor() {
        this.level = Logger.LEVEL.INFO
        this.loggerMap = new Map()
        this.reporter = new BasicLogReporter()
    }

    /**
     * 
     * @param {LogReporter} reporter 
     * @returns {this}
     */
    setReporter(reporter) {
        this.reporter = reporter
        return this
    }

    /**
     * 
     * @param {number} level 
     * @returns {this}
     */
    setLevel(level) {
        this.level = level
        return this
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Logger}
     */
    getLogger(namespace) {
        if (!this.loggerMap.has(namespace)) {
            this.loggerMap.set(namespace, new Logger(this, this.reporter, namespace))
        }
        return this.loggerMap.get(namespace)
    }

}

export default LoggingFactory