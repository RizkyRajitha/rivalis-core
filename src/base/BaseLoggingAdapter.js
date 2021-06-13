import LoggingAdapter from '../adapters/LoggingAdapter'

class BaseLoggingAdapter extends LoggingAdapter {

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    error(namespace, message) {
        console.log(`[ERROR][${namespace}] ${message}`)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    warning(namespace, message) {
        console.log(`[WARN][${namespace}] ${message}`)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    info(namespace, message) {
        console.log(`[INFO][${namespace}] ${message}`)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    debug(namespace, message) {
        console.log(`[DEBUG][${namespace}] ${message}`)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    trace(namespace, message) {
        console.log(`[TRACE][${namespace}] ${message}`)
    }
}

export default BaseLoggingAdapter