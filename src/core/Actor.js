import EventEmitter from '../structs/EventEmitter'
import Event from './Event'
import Room from './Room'

class Actor {

    /**
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * @readonly
     * @type {Object.<string,any>}
     */
    data = null

    /**
     * @readonly
     * @type {Map.<string,any>}
     */
    cache = null

    /**
     * @private
     * @type {Room}
     */
    room = null

    /**
     * @private
     * @type {EventEmitter}
     */
    events = null

    /**
     * @private
     */
    emit = {

        event: event => this.events.emit('event', event),

        leave: () => this.events.emit('leave')
    }

    /**
     * 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     * @param {Room} room 
     */
    constructor(id, data, room) {
        this.id = id
        this.data = data
        this.room = room
        this.events = new EventEmitter()
        this.cache = new Map()
    }

    /**
     * 
     * @param {string} key 
     * @param {any} data 
     */
    send(key, data) {
        let event = new Event({ key, data, sender: this.id })
        this.events.emit('event', event)
    }

    /**
     * @private
     */
    dispose() {
        this.events.removeAllListeners()
        this.events = null
    }
}
/**
 * 
 * @param {Actor} actor 
 */
Actor.dispose = actor => {
    actor.dispose()
}

export default Actor