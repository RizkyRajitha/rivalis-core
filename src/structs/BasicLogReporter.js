import LogReporter from '../interfaces/LogReporter'
import Logger from './Logger'

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
        console.log(`[${this.levels[level]}]${message}`)
    }

}

export default BasicLogReporter