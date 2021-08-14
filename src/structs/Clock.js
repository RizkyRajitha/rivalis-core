import { Signal } from 'signals'
import Exception from '../core/Exception'

/**
 * @callback ImpulseListener
 * 
 */

class Impulse {

    /**
     * @private
     * @type {number}
     */
    counter = 0

    /**
     * @private
     * @type {number}
     */
    ticks = 1

    /**
     * @private
     * @type {Signal}
     */
    signal = null

    constructor(counter = 0, ticks = 1) {
        this.counter = counter
        this.ticks = ticks
        this.signal = new Signal()
    }

    /**
     * 
     * @param {ImpulseListener} listener
     * @param {any} context
     * @param {number} [priority] 
     */
    add(listener, context, priority) {
        this.signal.add(listener, context, priority)
        return this
    }

    /**
     * 
     * @param {ImpulseListener} listener
     * @param {any} context
     * @param {number} [priority]
     */
    addOnce(listener, context, priority) {
        this.signal.addOnce(listener, context, priority)
        return this
    }

    /**
     * 
     * @param {ImpulseListener} listener
     * @param {any} context
     */
    remove(listener, context) {
        this.signal.remove(listener, context)
        return this
    }

    removeAll() {
        this.signal.removeAll()
        return this
    }

    /**
     * @private
     */
    tick() {
        this.counter++
        if (this.counter % this.ticks === 0) {
            this.counter = 0
            this.dispatch()
        }
    }

}

class Clock {

    /**
     * @private
     * @type {Map.<number,Impulse>}
     */
    impulses = null

    /**
     * @private
     * @type {number}
     */
    intervalId = null

    constructor(interval = 1000) {
        this.impulses = new Map()
        this.intervalId = setInterval(() => this.tick(), interval)
    }

    dispose() {
        clearInterval(this.intervalId)
        this.impulses.forEach(impulse => impulse.removeAll())
        this.impulses.clear()
    }

    /**
     * 
     * @param {number} ticks 
     * @returns {Impulse}
     */
    every(ticks = 1) {
        if (typeof ticks !== 'number') {
            throw new Exception('ticks must be a number')
        }
        if (this.impulses.has(ticks)) {
            return this.impulses.get(ticks)
        }
        let impulse = new Impulse(0, ticks)
        this.impulses.set(ticks, impulse)
        return impulse
    }

    /**
     * @private
     */
    tick() {
        this.impulses.forEach(impulse => {
            impulse.tick()
        })
    }


}

export default Clock