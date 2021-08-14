import LogReporter from '../interfaces/LogReporter'
import stringify from '../utils/stringify'

class Logger {

    /**
     * @private
     * @type {string}
     */
    namespace = null

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
     * @type {Map.<number,string>}
     */
    levels = null

    constructor(namespace, reporters, level = Logger.LEVEL.INFO) {
        this.namespace = namespace
        this.reporters = reporters
        this.level = level
    
        this.levels = new Map()
        for (let level in Logger.LEVEL) {
            this.levels.set(Logger.LEVEL[level], level)
        }
    }

    /**
     * 
     * @param  {...any} args 
     * @returns {void}
     */
     error(...args) {
        if (this.level < Logger.LEVEL.ERROR) {
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
        if (this.level < Logger.LEVEL.WARNING) {
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
        if (this.level < Logger.LEVEL.INFO) {
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
        if (this.level < Logger.LEVEL.DEBUG) {
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
        if (this.level < Logger.LEVEL.TRACE) {
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
                logs.push(stringify(arg))
            }   
        }

        for (let reporter of this.reporters) {
            let message = `${logs.join(' ')} ${stack}`
            reporter.log(this.levels.get(level), this.namespace, message)
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