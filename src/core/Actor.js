import Broker from '../structs/Broker'
import Event from './Event'

/**
 * @extends {Broker<Event>}
 */
class Actor extends Broker {

    id = null

    data = null

    cache = null

    on = {
        dispose: (eventListener, context) => this.events.on('dispose', eventListener, context)
    }

    constructor() {
        super()        
    }

    send(key, data) {

    }

    dispose() {
        this.events.emit('dispose', this)
        this.events.removeAllListeners()
    }


}

let e = new Actor()

export default Actor