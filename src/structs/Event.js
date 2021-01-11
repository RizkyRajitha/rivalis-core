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
     * @private
     * @type {VectorClock} 
     */
    vectorClock = null

    /**
     * 
     * @param {Event} event 
     */
    constructor(event = {}) {
        const { uid, type, clock, senderId, data } = event
        this.uid = typeof uid === 'string' ? uid : uuid()
        this.type = type
        this.clock = clock
        this.senderId = senderId
        this.data = data
        this.vectorClock = new VectorClock(senderId, clock)
    }

    /**
     * 
     * @returns {VectorClock}
     */
    getVectorClock() {
        return this.vectorClock
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