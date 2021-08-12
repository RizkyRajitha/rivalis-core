import Broadcast from '../structs/Broadcast'
import Room from './Room'

class Actor {

    id = null

    data = null

    /**
     * @private
     * @type {Room}
     */
    room = null

    /**
     * @private
     * @type {Broadcast}
     */
    events = null

    /**
     * @private
     */
    emit = {

        event: event => this.events.emit('event', event),

        leave: () => this.events.emit('leave')
    }

    constructor(id, data, room) {
        this.id = id
        this.data = data
        this.room = room
        this.events = new Broadcast()
    }

    send(event) {
        this.events.emit('event', event)
    }

    /**
     * @private
     */
    dispose() {
        this.events.dispose()
    }
}
/**
 * 
 * @param {Actor} actor 
 */
Actor.dispose = actor => {
    actor.dispose()
}

export default Actor