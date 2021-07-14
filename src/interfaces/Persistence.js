import StorageProvider from './StorageProvider'
import PubSubProvider from './PubSubProvider'
import QueueProvider from './QueueProvider'

class Persistence {

    /**
     * 
     * @returns {Promise.<void>}
     */
    init() {
        return Promise.reject(new Exception('Persistence#initialize is not implemented'))
    }

    /**
     * @returns {StorageProvider}
     */
    getStorage() {
        throw new Exception('Persistence#getStorage not is implemented')
    }

    /**
     * @returns {PubSubProvider}
     */
    getPubSub() {
        throw new Exception('Persistence#getPubSub not is implemented')
    }

    /**
     * @returns {QueueProvider}
     */
    getQueue() {
        throw new Exception('Persistence#getQueue not is implemented')
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        throw new Exception('Persistence#dispose not is implemented')
    }

}

export default Persistence