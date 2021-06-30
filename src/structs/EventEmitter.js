import Emitter from 'eventemitter3'

/**
 * @template T
 * @extends {Emitter<T>}
 */
class EventEmitter extends Emitter {

    /**
     * @callback EventListener
     * @param {T} message
     */

    constructor() {
        super()
    }

    /**
     * Add a listener for a given event.
     * @param {string} event 
     * @param {EventListener} fn 
     * @param {any} [context] 
     * @returns {this}
     */
    addListener(event, fn, context) {
        return super.addListener(event, fn, context)
    }

    /**
     * Remove the listeners of a given event.
     * @param {string} event 
     * @param {EventListener} fn 
     * @param {any} [context] 
     * @returns {this}
     */
    removeListener(event, fn, context) {
        return super.removeListener(event, fn, context)
    }

    /**
     * Remove all listeners, or those of the specified event.
     * @param {string} [event] 
     * @returns {this}
     */
    removeAllListeners(event) {
        return super.removeAllListeners(event)
    }

    /**
     * Add a listener for a given event.
     * @param {string} event 
     * @param {EventListener} fn 
     * @param {any} [context] 
     * @returns {this}
     */
    on(event, fn, context) {
        return super.on(event, fn, context)
    }

    /**
     * Add a one-time listener for a given event.
     * @param {string} event 
     * @param {EventListener} fn 
     * @param {any} [context] 
     * @returns {this}
     */
    once(event, fn, context) {
        return super.once(event, fn, context)
    }

    /**
     * Remove the listeners of a given event.
     * @param {string} event 
     * @param {EventListener} fn 
     * @param {any} [context] 
     * @returns {this}
     */
    off(event, fn, context) {
        return super.off(event, fn, context)
    }
    /**
     * Calls each of the listeners registered for a given event.
     * @param {string} event 
     * @param  {...T} messages 
     * @returns {boolean}
     */
    emit(event, ...messages) {
        return super.emit(event, ...messages)
    }

    /**
     * Return the listeners registered for a given event.
     * @param {string} event
     * @returns {Array.<EventListener>}
     */
    listeners(event) {
        return super.listeners(event)
    }

    /**
     * Return an array listing the events for which the emitter has registered listeners.
     * @returns {Array.<string>}
     */
    eventNames() {
        return super.eventNames()
    }

    /**
     * Return the number of listeners listening to a given event.
     * @param {string} event
     * @returns {number}
     */
    listenerCount(event) {
        return super.listenerCount(event)
    }
}

export default EventEmitter