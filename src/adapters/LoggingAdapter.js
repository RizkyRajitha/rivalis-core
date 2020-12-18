class LoggingAdapter {

    /**
     * 
     * @returns {Promise.<boolean>}
     */
    initialize() {
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace
     * @param {any} message
     */
    error(namespace, ...message) {}

    /**
     * 
     * @param {string} namespace 
     * @param {any} message
     */
    warn(namespace, ...message) {}

    /**
     * 
     * @param {string} namespace 
     * @param  {any} message 
     */
    info(namespace, ...message) {}

    /**
     * 
     * @param {string} namespace 
     * @param  {any} message 
     */
    verbose(namespace, ...message) {}

    /**
     * 
     * @param {string} namespace 
     * @param {any} message 
     */
    debug(namespace, ...message) {}

    /**
     * 
     * @param {string} namespace 
     * @param {any} message 
     */
    silly(namespace, ...message) {}

}

export default LoggingAdapter