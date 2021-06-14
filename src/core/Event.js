class Event {

    /**
     * 
     * @readonly
     * @type {string}
     */
    uid = null

    /**
     * 
     * @readonly
     * @type {string}
     */
    key = null

    /**
     * 
     * @readonly
     * @type {Object.<string,number>}
     */
    clock = null

    /**
     * 
     * @readonly
     * @type {string}
     */
    sender = null

    /**
     * 
     * @readonly
     * @type {any}
     */
    data = null
}

/**
 * 
 * @param {Event} event
 * @returns {string} 
 */
Event.stringify = event => {
    return JSON.stringify(event)
}

/**
 * 
 * @param {string} event
 * @returns {Event} 
 */
Event.parse = event => {
    return new Event(JSON.parse(event))
}

export default Event