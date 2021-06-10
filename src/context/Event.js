import { v4 as uuid } from 'uuid'

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
    filter = null

    /**
     * 
     * @readonly
     * @type {string}
     */
    namespace = null

    /**
     * 
     * @readonly
     * @type {Array.<number>}
     */
    time = []


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

    /**
     * 
     * @param {Event} event 
     */
    constructor(event = {}) {
        this.uid = typeof event.uid === 'string' ? event.uid : uuid()
        this.namespace = typeof event.namespace === 'string' ? event.namespace : this.namespace
        this.time = Array.isArray(event.time) ? event.time : this.time
        this.clock = typeof event.clock === 'object' ? event.clock : this.clock
        this.sender = typeof sender === 'string' ? sender : this.sender
        this.data = typeof data !== 'undefined' ? data : this.data
    }

    setFilter() {
        
    }
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