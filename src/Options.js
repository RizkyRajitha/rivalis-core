import InMemoryMessagingAdapter from './adapters/inmemory/InMemoryMessagingAdapter'
import InMemoryStorageAdapter from './adapters/inmemory/InMemoryStorageAdapter'
import MessagingAdapter from './adapters/MessagingAdapter'
import StorageAdapter from './adapters/StorageAdapter'

class Adapters {

    /**
     * 
     * @type {MessagingAdapter}
     */
    messaging = new InMemoryMessagingAdapter()

    /**
     * 
     * @type {StorageAdapter}
     */
    storage = new InMemoryStorageAdapter()

}


class Options {

    adapters = new Adapters()

    /**
     * 
     * @param {RivalisOptions} options 
     */
    constructor(options) {
        
    }

}

export default Options

export { Adapters }