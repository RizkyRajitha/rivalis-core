import Actor from '../core/Actor'
import Event from '../core/Event'
import Engine from '../engine/Engine'
import { generateID } from '../helper/generateID'
import VectorClock from '../structs/VectorClock'

class EventManager {

    /**
     * 
     * @private
     * @type {Engine}
     */
    engine = null

    /**
     * 
     * @private
     * @type {VectorClock}
     */
    contextClock = null

    /**
     * 
     * @param {Engine} engine 
     * @param {VectorClock} contextClock
     */
    constructor(engine, contextClock) {
        this.engine = engine
        this.contextClock = contextClock
    }

    /**
     * 
     * @param {Actor|null} actor 
     * @returns {Event}
     */
    create(actor = null) {
        let uid = generateID()
        let clock = null
        let sender = null
        if (actor instanceof Actor) {
            actor.clock.increment()
            clock = actor.clock.getClock()
            sender = actor.clock.nodeId
        } else {
            this.contextClock.increment()
            clock = this.contextClock.getClock()
            sender = this.contextClock.nodeId
        }
        return new Event(uid, clock, sender)
    }

    /**
     * 
     * @param {Event} event 
     * @returns {Promise.<any>}
     */
    emit(event) {
        return this.engine.eventBroker.emit(event)
    }

}

export default EventManager