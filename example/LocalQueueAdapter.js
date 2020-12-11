import { QueueAdapter } from '../src'

class LocalQueueAdapter extends QueueAdapter {

    /**
     * @returns {Promise<boolean>}
     */
    initialize() {
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace
     * @param {any} data 
     * @returns {Promise<boolean>} 
     */
    enqueue(namespace, data) {
        this.checkNamespace(namespace)
        this[namespace].push(data)
        return Promise.resolve(true)
    }

    /**
     * 
     * @param {string} namespace
     * @returns {Promise<any>}
     */
    dequeue(namespace) {
        this.checkNamespace(namespace)
        return Promise.resolve(this[namespace].pop())
    }

    /**
     * 
     * @param {string} namespace 
     * @param {number} offset 
     * @param {number} limit 
     * @returns {Promise<Array.<any>>}
     */
    get(namespace, offset = 0, limit = -1) {
        this.checkNamespace(namespace)
        /** @type {Array} */
        let array = this[namespace]
        let out = []
        limit = limit < 0 ? array.length + limit : limit
        array.forEach((item, index) => {
            if (index >= offset && index <= limit) {
                out.push(item)
            }
        })
        return Promise.resolve(out)
    }

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<any>}
     */
    getLast(namespace) {
        this.checkNamespace(namespace)
        /** @type {Array} */
        let array = this[namespace]
        return Promise.resolve(array[array.length - 1] || null)
    }

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<any>}
     */
    getFirst(namespace) {
        this.checkNamespace(namespace)
        /** @type {Array} */
        let array = this[namespace]
        return Promise.resolve(array[0] || null)
    }

    /**
     * 
     * @param {*} namespace 
     * @returns {Promise<boolean>}
     */
    clear(namespace) {
        this.checkNamespace(namespace)
        this[namespace] = []
        return Promise.resolve(true)
    }

    checkNamespace(namespace) {
        if (typeof this[namespace] === 'undefined') {
            this[namespace] = []
        }
    }

}

export default LocalQueueAdapter