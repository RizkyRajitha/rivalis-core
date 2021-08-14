import Action from '../core/Action'
import Event from '../core/Event'
import Compression from '../interfaces/Compression'
import Codec from '../structs/Codec'

class TransportCodec {

    /**
     * @type {Codec.<Event>}
     */
    events = null

    /**
     * @type {Codec.<Action>}
     */
    actions = null

    /**
     * 
     * @param {Compression} compression 
     */
    constructor(compression = null) {
        this.events = new Codec(Event, compression)
        this.actions = new Codec(Action, compression)
    }

}

export default TransportCodec