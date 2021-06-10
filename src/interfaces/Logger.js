import LoggingAdapter from '../adapters/LoggingAdapter'

class Logger {

    /**
     * 
     * @private
     * @type {LoggingAdapter}
     */
    adapter = null

    /**
     * 
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * 
     * @private
     * @type {number}
     */
    level = null

    /**
     * 
     * @param {LoggingAdapter} adapter
     * @param {string} namespace
     * @param {LoggerLevel} level 
     */
    constructor(adapter, namespace = 'global', level = 3) {
        this.adapter = adapter
        this.namespace = namespace
        this.level = level
    }

    error(...messages) {
        if (this.level < Logger.LEVEL.ERROR) {
            return
        }
        this.adapter.error(this.namespace, messages.join(','))
    }

    warning(...messages) {
        if (this.level < Logger.LEVEL.WARNING) {
            return
        }
    }

    info(...messages) {
        if (this.level < Logger.LEVEL.INFO) {
            return
        }
    }

    debug(...messages) {
        if (this.level < Logger.LEVEL.DEBUG) {
            return
        }
    }

    trace(...messages) {
        if (this.level < Logger.LEVEL.ALL) {
            return
        }
    }

    /**
     * 
     * @param {number} level 
     */
    setLevel(level) {
        this.level = level
    }


}

/**
 * 
 * @typedef {number} LoggerLevel
 */

/**
 * @readonly
 * @enum {LoggerLevel}
 */
Logger.LEVEL = {
    NONE: 0,
    ERROR: 1,
    WARNING: 2,
    INFO: 3,
    DEBUG: 4,
    ALL: 5
}


