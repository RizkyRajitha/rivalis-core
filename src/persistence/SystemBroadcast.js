import Broadcast from '../structs/Broadcast'
import Codec from '../structs/Codec'
import Persistence from '../interfaces/Persistence'

/**
 * @template M
 */
 class SystemEvent {

    /**
     * @readonly
     * @type {string}
     */
    type = null

    /**
     * @readonly
     * @type {M}
     */
    data = null

    /**
     * 
     * @param {SystemEvent} data 
     */
    constructor(data) {
        this.type = data.type
        this.data = data.data
    }

}

/**
 * @template T
 * @extends {Broadcast<T>}
 */
class SystemBroadcast extends Broadcast {

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
     * @param {Codec.<T>} [codec]
     */
    constructor(persistence, namespace, address, codec = null) {
        super()
        this.persistence = persistence
        this.namespace = namespace
        this.address = address
        this.codec = codec
        persistence.subscribe(namespace, address, this.onEvent)
    }

    
    /**
     * @private
     * @param {string} data 
     */
    onEvent = (data) => {
        let event = JSON.parse(data)
        if (this.codec !== null) {
            event.data = this.codec.decode(event.data)
        }
        this.emit(event.type, event.data)
    }

    /**
     * @protected
     * @param {string} type
     * @param {T} data
     */
    broadcast(type, data) {
        if (this.codec !== null) {
            data = this.codec.encode(data)
        }
        let encoded = JSON.stringify({ type, data })
        return this.persistence.publish(this.namespace, this.address, encoded)
    }

    /**
     * @protected
     * 
     */
    dispose() {
        super.dispose()
        this.persistence.unsubscribe(this.namespace, this.address, this.onEvent)
    }

}

SystemBroadcast.SystemEvent = SystemEvent

export default SystemBroadcast