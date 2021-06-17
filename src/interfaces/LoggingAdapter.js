class LoggingAdapter {

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
    error(namespace, message) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    warning(namespace, message) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    info(namespace, message) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    debug(namespace, message) {}

    /**
     * 
     * @param {string} namespace 
     * @param {string} message 
     */
    trace(namespace, message) {}
}

export default LoggingAdapter