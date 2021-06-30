import LogReporter from '../interfaces/LogReporter'
import LoggingFactory from './LoggingFactory'

/**
 * 
 * @param {any} unit 
 * @returns {string}
 */
const stringify = (unit) => {
    if (typeof unit === 'string') {
        return unit
    } else if (typeof unit === 'function') {
        try {
            return unit.prototype.constructor.toString()
        } catch (error) {
            try {
                return unit.toString()
            } catch (error) {
                return ''
            }
        }
    } else if (typeof unit === 'undefined') {
        return 'undefined'
    } else if (typeof unit === 'object') {
        let cache = new Map()
        let data = JSON.stringify(unit, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.has(value)) {
                    return
                }
                cache.set(value, 0)
            }
            return value
        })
        cache.clear()
        cache = null
        return data
    } else {
        return JSON.stringify(unit)
    }

}

class Logger {

    /**
     * @private
     * @type {LoggingFactory}
     */
    logger = null

    /**
     * @private
     * @type {LogReporter}
     */
    reporter = null

    /**
     * @private
     * @type {string}
     */
    namespace = null

    constructor(logger, reporter, namespace) {
        this.logger = logger
        this.reporter = reporter
        this.namespace = namespace
    }

    error(...args) {
        if (this.logger.level < Logger.LEVEL.ERROR) {
            return
        }
        this.log(Logger.LEVEL.ERROR, ...args)
    }

    warning(...args) {
        if (this.logger.level < Logger.LEVEL.WARNING) {
            return
        }
        this.log(Logger.LEVEL.WARNING, ...args)
    }

    info(...args) {
        if (this.logger.level < Logger.LEVEL.INFO) {
            return
        }
        this.log(Logger.LEVEL.INFO, ...args)
    }

    debug(...args) {
        if (this.logger.level < Logger.LEVEL.DEBUG) {
            return
        }
        this.log(Logger.LEVEL.DEBUG, ...args)
    }

    trace(...args) {
        if (this.logger.level < Logger.LEVEL.TRACE) {
            return
        }
        this.log(Logger.LEVEL.TRACE, ...args)
    }

    /**
     * 
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
                logs.push(stringify(arg))
            }
            
        }
        this.reporter.log(level, `[${this.namespace}]: ${logs.join(' ')} ${stack}`)
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
export { stringify }