import Persistence from '../interfaces/Persistence'
import Broker from '../structs/Broker'

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
     * 
     * @param {Persistence} persistence 
     * @param {string} namespace 
     * @param {string} address
     */
    constructor(persistence, namespace, address) {
        super()
        this.persistence = persistence
        this.namespace = namespace
        this.address = address
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    initialize() {
        return this.persistence.subscribe(this.namespace, this.address, this.onMessage)
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        return this.persistence.unsubscribe(this.namespace, this.address, this.onMessage)
    }

    /**
     * 
     * @param {T} data 
     */
    dispatch(data) {
        let message = null
        message = JSON.stringify(message ? message : data)
        return this.persistence.publish(this.namespace, this.address, message)
    }

    /**
     * @private
     * @param {string} message 
     */
    onMessage = message => {
        let data = JSON.parse(message)
        this.emit(data)
    }
}

export default MessageBroker