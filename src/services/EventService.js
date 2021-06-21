import Actor from '../core/Actor'
import Event from '../core/Event'
import ContextProvider from '../providers/ContextProvider'

class EventService {

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @private
     * @type {ContextProvider}
     */
    provider = null

    /**
     * 
     * @param {ContextProvider} provider 
     */
    constructor(provider) {
        this.provider = provider
    }

    /**
     * 
     * @param {Actor|null} actor 
     * @returns {Event}
     */
    create(actor = null) {
        let clock = actor instanceof Actor ? actor.getClock() : this.provider.context.getClock()
        clock.increment()
        return new Event(clock.getClock(), clock.nodeId)
    }

    /**
     * 
     * @param {Event} event 
     * @returns {Promise.<any>}
     */
    emit(event) {
        return this.provider.events.emit(event)
    }

}

export default EventService