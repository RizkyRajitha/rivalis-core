import LoggerFactory from './LoggerFactory'
import stringifyLog from '../utils/stringifyLog'
class Logger {

    /**
     * @private
     * @type {LoggerFactory}
     */
    factory = null

    /**
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * 
     * @param {LoggerFactory} factory 
     * @param {string} namespace 
     */
    constructor(factory, namespace) {
        this.factory = factory
        this.namespace = namespace
    }

    /**
     * 
     * @param  {...any} args 
     * @returns {void}
     */
    error(...args) {
        if (this.logger.level < Logger.LEVEL.ERROR) {
            return
        }
        this.log(Logger.LEVEL.ERROR, ...args)
    }

    /**
     * 
     * @param  {...any} args 
     * @returns {void}
     */
    warning(...args) {
        if (this.logger.level < Logger.LEVEL.WARNING) {
            return
        }
        this.log(Logger.LEVEL.WARNING, ...args)
    }

    /**
     * 
     * @param  {...any} args 
     * @returns {void}
     */
    info(...args) {
        if (this.logger.level < Logger.LEVEL.INFO) {
            return
        }
        this.log(Logger.LEVEL.INFO, ...args)
    }

    /**
     * 
     * @param  {...any} args 
     * @returns {void}
     */
    debug(...args) {
        if (this.logger.level < Logger.LEVEL.DEBUG) {
            return
        }
        this.log(Logger.LEVEL.DEBUG, ...args)
    }

    /**
     * 
     * @param  {...any} args 
     * @returns {void}
     */
    trace(...args) {
        if (this.logger.level < Logger.LEVEL.TRACE) {
            return
        }
        this.log(Logger.LEVEL.TRACE, ...args)
    }

    /**
     * @private
     * @param {number} level 
     * @param  {...any} args 
     */
    log(level, ...args) {
        let logs = []
        let stack = ''

        for (let i = 0; i < args.length; i++) {
            let arg = args[i]
            if (i === args.length - 1 && arg instanceof Error) {
                stack = arg.stack
                continue   
            }
            if (arg instanceof Error) {
                logs.push(arg.message)
            } else {
                logs.push(stringifyLog(arg))
            }   
        }

        for (let reporter of this.factory.reporters) {
            let message = `[${this.namespace}]: ${logs.join(' ')} ${stack}`
            reporter.log(level, message)
        }
    }

}

/**
 * @enum {number}
 */
 Logger.LEVEL = {
    NONE : 0,
    ERROR : 1,
    WARNING : 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5,
}

export default Logger