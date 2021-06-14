import EventEmitter from 'eventemitter3'
import MessageBrokerAdapter from './MessageBrokerAdapter'

class LocalMessageBrokerAdapter extends MessageBrokerAdapter {

    /**
     * 
     * @private
     * @type {EventEmitter}
     */
    emitter = null

    /**
     * 
     * @returns {Promise.<any>}
     */
     initialize() {
        this.emitter = new EventEmitter()
        return Promise.resolve()
     }

     /**
      * subscribe to specific address for receiving messages
      * @param {string} namespace 
      * @param {string} address 
      * @param {MessageListener} listener
      * @returns {Promise.<any>} 
      */
     subscribe(namespace, address, listener) {
        this.emitter.on(`${namespace}-${address}`, listener)
        return Promise.resolve()
     }
  
     /**
      * unsubscribe of already subscribed address
      * @param {string} namespace 
      * @param {string} address
      * @param {MessageListener} listener
      * @returns {Promise.<any>}
      */
     unsubscribe(namespace, address, listener) {
        this.emitter.off(`${namespace}-${address}`, listener)
        return Promise.resolve()
     }
  
     /**
      * publish message to an address
      * @param {string} namespace 
      * @param {string} address 
      * @param {string} message
      * @returns {Promise.<any>} 
      */
     publish(namespace, address, message) {
        this.emitter.emit(`${namespace}-${address}`, message)
        return Promise.resolve()
     }

}

export default LocalMessageBrokerAdapter