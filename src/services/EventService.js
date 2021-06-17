import Actor from '../core/Actor'
import Event from '../core/Event'
import ContextEngine from '../engines/ContextEngine'

class EventService {

    /**
     * 
     * @private
     * @type {ContextEngine}
     */
    engine = null

    /**
     * 
     * @param {ContextEngine} engine 
     */
    constructor(engine) {
        this.engine = engine
    }

    /**
     * 
     * @param {Actor|null} actor 
     * @returns {Event}
     */
    create(actor = null) {
        let clock = actor instanceof Actor ? actor.getClock() : this.engine.context.getClock()
        clock.increment()
        return new Event(clock.getClock(), clock.nodeId)
    }

    /**
     * 
     * @param {Event} event 
     * @returns {Promise.<any>}
     */
    emit(event) {
        return this.engine.events.emit(event)
    }

}

export default EventService