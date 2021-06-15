import VectorClock from "../structs/VectorClock"

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

    /**
     * 
     * @param {string} uid
     * @param {Object.<string,number>} clock 
     * @param {string} sender 
     */
    constructor(uid, clock, sender) {
        this.uid = uid
        this.clock = clock
        this.sender = sender
    }

    /**
     * 
     * @param {string} key 
     * @param {any} data 
     * @param {boolean} emit 
     * @returns {this}
     */
    set(key, data) {
        this.key = key
        this.data = data
        return this
    }

    /**
     * 
     * @returns {VectorClock}
     */
    getVectorClock() {
        return new VectorClock(this.sender, this.clock)
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
    const { uid, key, clock, sender, data } = JSON.parse(event)
    return new Event(uid, clock, sender).set(key, data)
}

export default Event