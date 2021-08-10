import EventEmitter from './EventEmitter'
/**
 * @template T
 */
class Broker {

    /**
     * @callback EventListener
     * @param {T} message
     */

    /**
     * @protected
     * @type {EventEmitter.<T>}
     */
    events = null

    constructor() {
        this.events = new EventEmitter()
    }

    /**
     * 
     * @param {EventListener} eventListener 
     * @param {any} context 
     * @returns {this}
     */
    subscribe(eventListener, context) {
        this.events.on('data', eventListener, context)
        return this
    }

    /**
     * 
     * @param {EventListener} eventListener 
     * @param {any} context 
     * @returns {this}
     */
    unsubscribe(eventListener, context) {
        this.events.off('data', eventListener, context)
        return this
    }

    /**
     * @protected
     * @param {T} data 
     */
    emit(data) {
        this.events.emit('data', data)
        return this
    }

}

export default Broker