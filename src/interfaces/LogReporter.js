import Exception from '../core/Exception'

class LogReporter {

    /**
     * initialize log reporter
     * @returns {Promise.<void>}
     */
    async init() {
        throw new Exception('LogReporter#init is not implemented')
    }

    /**
     * dispose log reporter
     * @returns {Promise.<void>}
     */
    async dispose() {
        throw new Exception('LogReporter#dispose is not implemented')
    }

    /**
     * 
     * @param {number} level 
     * @param {string} namespace
     * @param {string} message 
     */
    log(level, namespace, message) {
        throw new Exception('LogReporter#log is not implemented')
    }

}

export default LogReporter