import { v4 as uuid } from 'uuid'
import LoggingAdapter from './adapters/LoggingAdapter'
import MessagingAdapter from './adapters/MessagingAdapter'
import Context from './context/Context'
import ContextOptions from './context/ContextOptions'

class Rivalis {

    /**
     * @private
     * @type {Adapters}
     */
    adapters = new Adapters()

    initalize() {
        
    }

    /**
     * 
     * @param {ContextOptions} options 
     */
    createContext(options) {
        const id = uuid()
        return id
    }

    /**
     * 
     * @param {string} id 
     * @returns {Context}
     */
    getContext(id) {
        return new Context(id, this.adapters)
    }

    deleteContext(id) {
        return null
    }

    addActionHandler(key, actionHandler) {
        
    }

    /**
     * 
     * @param {MessagingAdapter} messagingAdapter 
     */
    setMessaging(messagingAdapter) {

    }

    /**
     * 
     * @param {LoggingAdapter} loggingAdapter 
     */
    setLogging(loggingAdapter) {
        
    }

}

export default Rivalis

export const Adapters = class Adapters {

    /**
     * 
     * @type {MessagingAdapter}
     */
    messaging = new MessagingAdapter()

    /**
     * 
     * @type {LoggingAdapter}
     */
    logging = new LoggingAdapter()

}