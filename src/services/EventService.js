import Actor from '../core/Actor'
import Context from '../core/Context'
import Event from '../core/Event'
import ContextSync from '../persistence/ContextSync'

class EventService {

    /**
     * @private
     * @type {ContextSync}
     */
    sync = null

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
     * @param {Context} context 
     * @param {ContextSync} sync
     */
    constructor(context, sync) {
        this.context = context
        this.sync = sync
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
        return this.sync.events.emit(event)
    }

}

export default EventService