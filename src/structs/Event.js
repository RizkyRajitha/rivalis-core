import { v4 as uuid } from 'uuid'
import VectorClock from './VectorClock'

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
    type = null

    /**
     * 
     * @readonly
     * @type {object}
     */
    clock = null

    /**
     * 
     * @readonly
     * @type {string}
     */
    senderId = null


    /**
     * 
     * @readonly
     * @type {any}
     */
    data = null

    /**
     * 
     * @readonly
     * @type {Array.<number>}
     */
    time = []

    /**
     * 
     * @param {Event} event 
     */
    constructor(event = {}) {
        const { uid, type, clock, senderId, data, time } = event
        this.uid = typeof uid === 'string' ? uid : uuid()
        this.type = type
        this.clock = clock
        this.senderId = senderId
        this.data = data
        this.time = time
    }

    /**
     * 
     * @returns {VectorClock}
     */
    getVectorClock() {
        return new VectorClock(this.senderId, this.clock)
    }
}

/**
 * 
 * @param {Event} eventA 
 * @param {Event} eventB 
 * @returns {number}
 */
Event.compare = (eventA, eventB) => {
    return VectorClock.compare(eventA.getVectorClock(), eventB.getVectorClock())
}

export default Event