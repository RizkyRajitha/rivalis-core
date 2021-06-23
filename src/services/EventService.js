import Actor from '../core/Actor'
import Context from '../core/Context'
import Event from '../core/Event'
import Persistence from '../persistence/Persistence'

class EventService {

    /**
     * @private
     * @type {Persistence}
     */
    persistence = null

    /**
     * @private
     * @type {Context}
     */
    context = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {Persistence} persistence
     * @param {Context} context 
     */
    constructor(persistence, context) {
        this.persistence = persistence
        this.context = context
    }

    /**
     * 
     * @param {Actor|null} actor 
     * @returns {Event}
     */
    create(actor = null) {
        let clock = actor instanceof Actor ? actor.clock : this.context.clock
        clock.increment()
        return new Event(clock.getClock(), clock.nodeId)
    }

    /**
     * 
     * @param {Event} event 
     * @returns {Promise.<void>}
     */
    emit(event) {
        return this.persistence.events.emit(event)
    }

}

export default EventService