import Event from '../core/Event'
import CodecExecutor from './CodecExecutor'

class Codec {

    /**
     * @type {CodecExecutor.<Event>}
     */
    events = null

    /**
     * @type {CodecExecutor.<Object.<string,any>>}
     */
    actions = null

    constructor() {
        this.events = new CodecExecutor(['key', 'clock', 'sender', 'data'], 'e', message => {
            return new Event(message[1], message[2]).set(message[0], message[3])
        })

        this.actions = new CodecExecutor(['key', 'data'], 'a', message => {
            return { key: message[0], data: message[1] }
        })
    }

}

let instance = null

/**
 * 
 * @returns {Codec}
 */
Codec.getInstance = () => {
    if (instance === null) {
        instance = new Codec()
    }
    return instance
}

export default Codec