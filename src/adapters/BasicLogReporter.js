import LogReporter from '../interfaces/LogReporter'

class BasicLogReporter extends LogReporter {

    /**
     * @returns {Promise.<void>}
     */
    async init() {}

    /**
     * @returns {Promise.<void>}
     */
    async dispose() {}

    /**
     * 
     * @param {number} level 
     * @param {string} namespace 
     * @param {string} message 
     */
    log(level, namespace, message) {
        let time = new Date().toISOString()
        console.log(`[${level}][${time}][${namespace}]: ${message}`)
    }

}

export default BasicLogReporter