import Actor from '../Actor'
import Event from '../Event'

class EventModule {

    constructor(core) {
        this.core = core
    }

    /**
     * 
     * @param {Actor|null} actor 
     * @returns {Event}
     */
    create(actor = null) {
        // let clock = null
        // let sender = null
        // if (actor instanceof Actor) {
        //     actor.clock.increment()
        //     clock = actor.clock.getClock()
        //     sender = actor.clock.nodeId
        // } else {
        //     this.contextClock.increment()
        //     clock = this.core.context.getClock()
        //     sender = this.contextClock.nodeId
        // }
        // return new Event(clock, sender)
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

export default EventModule