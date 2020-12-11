import QueueAdapter from '../adapters/QueueAdapter'

class Queue {

    /** @private */
    PREFIX = '_queue@rivalis:'

    /**
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * @private
     * @type {QueueAdapter}
     */
    queueAdapter = null

    /**
     * 
     * @param {string} namespace 
     * @param {QueueAdapter} queueAdapter 
     */
    constructor(namespace, queueAdapter) {
        this.namespace = this.PREFIX + namespace
        this.queueAdapter = queueAdapter
    }

    /**
     * 
     * @param {string} namespace
     * @param {any} data 
     * @returns {Promise<boolean>} 
     */
    enqueue(data) {
        return this.queueAdapter.enqueue(this.namespace, data)
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise<any>}
     */
    dequeue() {
        return this.queueAdapter.dequeue(this.namespace)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {number} offset 
     * @param {number} limit 
     * @returns {Promise<Array.<any>>}
     */
    get(offset = 0, limit = -1) {
        return this.queueAdapter.get(this.namespace, offset, limit)
    }

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<any>}
     */
    getLast() {
        return this.queueAdapter.getLast(this.namespace)
    }

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<any>}
     */
    getFirst() {
        return this.queueAdapter.getFirst(this.namespace)
    }

    /**
     * 
     * @returns {Promise<boolean>}
     */
    clear(namespace) {
        return this.queueAdapter.clear(this.namespace)
    }

}

export default Queue