import Persistence from '../interfaces/Persistence'
import Broker from '../structs/Broker'
import Codec from '../structs/Codec'

/**
 * @template T
 * @extends {Broker<T>}
 */
class MessageBroker extends Broker {

    /**
     * @private
     * @type {Persistence}
     */
    persistence = null

    /**
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * @private
     * @type {string}
     */
    address = null

    /**
     * @private
     * @type {Codec.<T>}
     */
    codec = null

    /**
     * 
     * @param {Persistence} persistence 
     * @param {string} namespace 
     * @param {string} address 
     * @param {Codec} [codec]
     */
    constructor(persistence, namespace, address, codec = null) {
        super()
        this.persistence = persistence
        this.namespace = namespace
        this.address = address
        this.codec = codec
    }

    initialize() {
        return this.persistence.subscribe(this.namespace, this.address, this.onMessage)
    }

    dispose() {
        return this.persistence.unsubscribe(this.namespace, this.address, this.onMessage)
    }

    dispatch(data) {
        let message = null
        if (this.codec !== null) {
            message = this.codec.encode(data)
        }
        message = JSON.stringify(message ? message : data)
        this.persistence.publish(this.namespace, this.address, message)
    }

    /**
     * @private
     * @param {string} message 
     */
    onMessage = message => {
        let data = JSON.parse(message)
        if (this.codec !== null) {
            data = this.codec.decode(data)
        }
        this.emit(data)
    }
}

export default MessageBroker