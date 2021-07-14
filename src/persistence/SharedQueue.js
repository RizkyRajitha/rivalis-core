import QueueProvider from '../interfaces/QueueProvider'
import Codec from '../structs/Codec'

/**
 * @template T
 */
class SharedQueue {

    /**
     * @private
     * @type {QueueProvider}
     */
    provider = null

    /**
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * @private
     * @type {Codec|null}
     */
    codec = null

    /**
     * 
     * @param {QueueProvider} provider 
     * @param {string} namespace 
     * @param {Codec} [codec] 
     */
    constructor(provider, namespace, codec = null) {
        this.provider = provider
        this.namespace = namespace
        this.codec = codec
    }

    /**
     * 
     * @param {T} value 
     * @returns {Promise.<boolean>}
     */
    enqueue(value) {
        return this.provider.enqueue(this.namespace, this.encode(value))
    }

    /**
     * 
     * @returns {Promise.<T|null>}
     */
    dequeue() {
        return this.provider.dequeue(this.namespace).then(value => {
            return this.decode(value)
        })
    }

    /**
     * 
     * @returns {Promise.<T|null>}
     */
    peek() {
        return this.provider.peek(this.namespace).then(value => {
            return this.decode(value)
        })
    }

    /**
     * 
     * @returns {Promise.<boolean>}
     */
    isEmpty() {
        return this.provider.isEmpty(this.namespace)
    }

    /**
     * 
     * @param {T} value 
     * @returns {string}
     */
    encode(data) {
        if (this.codec !== null) {
            data = this.codec.encode(data)
        }
        return JSON.stringify(data)
    }

    /**
     * 
     * @param {string} data 
     * @returns {T}
     */
    decode(data) {
        data = JSON.parse(data)
        if (this.codec !== null) {
            data = this.codec.decode(data)
        }
        return data
    }


}

export default SharedQueue