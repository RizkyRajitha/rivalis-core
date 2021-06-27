import Event from '../core/Event'
import CodecExecutor from './CodecExecutor'
import Compression from './Compression'

class Codec {

    /**
     * @type {CodecExecutor.<Event>}
     */
    events = null

    /**
     * @type {CodecExecutor.<Object.<string,any>>}
     */
    actions = null

    /**
     * @private
     * @type {Compression}
     */
    compression = null

    constructor() {
        this.compression = new Compression()

        this.events = new CodecExecutor(this.compression, ['key', 'clock', 'sender', 'data'], message => {
            return new Event(message[1], message[2]).set(message[0], message[3])
        })

        this.actions = new CodecExecutor(this.compression, ['key', 'data'], message => {
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