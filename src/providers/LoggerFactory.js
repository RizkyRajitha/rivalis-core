import LogReporter from '../interfaces/LogReporter'
import Logger from '../core/Logger'

class LoggerFactory {

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
     * @private
     * @type {number}
     */
    level = null

    /**
     * @private
     * @type {string}
     */
    nodeId = null

    /**
     * 
     * @param {Array.<LogReporter>} reporters 
     * @param {number}
     */
    constructor(reporters, level, nodeId) {
        this.reporters = reporters
        this.level = level
        this.nodeId = nodeId
        this.loggers = new Map()
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Logger}
     */
    getLogger(namespace) {
        // TODO: validate namespace, must be a string
        if (!this.loggers.has(namespace)) {
            let logger = new Logger(`${this.nodeId}:${namespace}`, this.reporters, this.level)
            this.loggers.set(namespace, logger)
        }
        return this.loggers.get(namespace)
    }

}

export default LoggerFactory