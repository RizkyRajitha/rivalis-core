import EventEmitter from './EventEmitter'
/**
 * @template T
 */
class Broadcaster {

    /**
     * @callback EventListener
     * @param {T} message
     */

    /**
     * @private
     * @type {EventEmitter.<T>}
     */
    events = null

    constructor() {
        this.events = new EventEmitter()
    }

    /**
     * 
     * @param {string} event 
     * @param {EventListener} eventListener 
     * @param {any} context 
     * @returns {this}
     */
    on(event, eventListener, context) {
        this.events.on(event, eventListener, context)
        return this
    }

    /**
     * 
     * @param {string} event 
     * @param {EventListener} eventListener 
     * @param {any} context 
     * @returns {this}
     */
    off(event, eventListener, context) {
        this.events.off(event, eventListener, context)
        return this
    }

    /**
     * 
     * @param {string} event 
     * @param {EventListener} eventListener 
     * @param {any} context 
     * @returns {this}
     */
    once(event, eventListener, context) {
        this.events.once(event, eventListener, context)
        return this
    }

    /**
     * @protected
     * @param {string} event 
     * @param  {...T} messages 
     * @returns {boolean}
     */
    emit(event, ...messages) {
        return this.events.emit(event, ...messages)
    }

    /**
     * @protected
     */
    dispose() {
        this.events.removeAllListeners()
        this.events = null
    }

}

export default Broadcaster