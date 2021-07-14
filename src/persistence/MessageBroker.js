import PubSubProvider from '../interfaces/PubSubProvider'
import Broker from '../structs/Broker'
import Codec from '../structs/Codec'

/**
 * @template T
 * @extends {Broker<T>}
 */
class MessageBroker extends Broker {

    /**
     * @private
     * @type {PubSubProvider}
     */
    provider = null

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
     * @param {PubSubProvider} pubSubProvider 
     * @param {string} namespace 
     * @param {string} address 
     * @param {Codec} [codec]
     */
    constructor(pubSubProvider, namespace, address, codec = null) {
        super()
        this.provider = pubSubProvider
        this.namespace = namespace
        this.address = address
        this.codec = codec
    }

    initialize() {
        return this.provider.subscribe(this.namespace, this.address, this.onMessage)
    }

    dispose() {
        return this.provider.unsubscribe(this.namespace, this.address, this.onMessage)
    }

    send(data) {
        let message = null
        if (this.codec !== null) {
            message = this.codec.encode(data)
        }
        message = JSON.stringify(message ? message : data)
        this.provider.publish(this.namespace, this.address, message)
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