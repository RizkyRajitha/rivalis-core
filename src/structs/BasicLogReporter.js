import LogReporter from '../interfaces/LogReporter'
import Logger from '../core/Logger'

class BasicLogReporter extends LogReporter {

    /**
     * @private
     * @type {Array.<string>}
     */
    levels = null

    constructor() {
        super()
        this.levels = Object.keys(Logger.LEVEL)
    }

    log(level, message) {
        let print = `[${this.levels[level]}]${message}`
        if (level === Logger.LEVEL.ERROR) {
            console.error(print)
        } else if (level === Logger.LEVEL.WARNING) {
            console.warn(print)
        } else {
            console.log(print)
        }
    }

}

export default BasicLogReporter