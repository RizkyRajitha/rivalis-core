import Broker from '../structs/Broker'

class Actor extends Broker {

    id = null

    data = null

    /**
     * @type {Room}
     */
    room = null

    /**
     * @private
     */
    on = {
        dispose: (eventListener, context) => this.events.on('dispose', eventListener, context)
    }

    constructor(id, data, room) {
        super()
        this.id = id
        this.data = data
        this.room = room

    }

    send(event) {

    }

    /**
     * @private
     */
    dispose() {
        this.events.emit('dispose', this)
        this.events.removeAllListeners()
    }

}

export default Actor