import Exception from '../core/Exception'

class QueueProvider {

    /**
     * 
     * @returns {Promise.<void>}
     */
    init() {
        return Promise.reject(new Exception('QueueProvider#initialize is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @param {string} value 
     * @returns {Promise.<boolean>}
     */
    enqueue(namespace, value) {
        return Promise.reject(new Exception('QueueProvider#enqueue is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<string|null>}
     */
    dequeue(namespace) {
        return Promise.reject(new Exception('QueueProvider#dequeue is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<string|null>}
     */
    peek(namespace) {
        return Promise.reject(new Exception('QueueProvider#peek is not implemented'))
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<boolean>}
     */
    isEmpty(namespace) {
        return Promise.reject(new Exception('QueueProvider#isEmpty is not implemented'))
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        return Promise.reject(new Exception('PubSubProvider#dispose is not implemented'))
    }

}

export default QueueProvider