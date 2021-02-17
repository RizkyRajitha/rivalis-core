import EventEmitter from 'eventemitter3'
import Message from '../models/Message'
import Connection from './Connection'

/**
 * @callback MessageListener
 * @param {any} message
 */

class Client {

    /**
     * 
     * @private
     * @type {EventEmitter>}
     */
    emitter = null

    /**
     * 
     * @private
     * @type {boolean}
     */
    isReady = false

    constructor() {
        this.emitter = new EventEmitter()
    }

    /**
     * 
     * @param {string} contextId 
     * @param {string} actorId 
     * @param {Object.<string,any>} data 
     */
    join(contextId, actorId, data = {}) {
        this.check()
        if (typeof contextId !== 'string') {
            throw new Error('contextId must be a string')
        }

        if (typeof actorId !== 'string') {
            throw new Error('actorId must be a string')
        }

        if (typeof data !== 'object') {
            throw new Error('data must be an object')
        }

        if (contextId.length === 0) {
            throw new Error('contextId can not be empty string')
        }

        if (actorId.length === 0) {
            throw new Error('actorId can not be empty string')
        }

        const message = JSON.stringify({
            kind: 'join',
            content: { contextId, actorId, data }
        })
        this.sendMessage(message)
    }

    /**
     * 
     * @param {string} type 
     * @param {any} data 
     */
    execute(type, data) {
        this.check()
        const message = JSON.stringify({
            kind: 'action',
            content: { type, data, time: new Date().getTime() }
        })
        this.sendMessage(message)
    }

    /**
     * 
     * @param {string} event 
     * @param {MessageListener} listener 
     * @param {any} context 
     */
    on(event, listener, context) {
        this.emitter.on(event, listener, context)
    }

    /**
     * 
     * @param {string} event 
     * @param {MessageListener} listener 
     * @param {any} context 
     */
    off(event, listener, context) {
        this.emitter.off(event, listener, context)
    }

    /**
     * 
     * 
     */
    disconnect() {
        this.isReady = false
        this.onDisconnect()
    }

    /**
     * 
     * @protected
     */
    ready() {
        this.isReady = true
        this.emitter.emit('ready')
    }

    /**
     * 
     * @private
     */
    check() {
        if (!this.isReady) {
            throw new Error('connection is not ready, event "ready" will be fired when client is able to communicate to server')
        }
    }

    /**
     * 
     * @protected
     * @param {string} content 
     */
    handleMessage(message) {
        let content = null
        try {
            content = JSON.parse(message)
        } catch (error) {
            throw new Error('unacceptable message format received from server')
        }
        let { code, data } = content
        if (code === Client.EVENTS.MESSAGE) {
            data = new Message(data)
            this.emitter.emit(data.type, data)
        }
        this.emitter.emit(code, data)
        
    }

    /**
     * 
     * @protected
     * @param {string} message 
     */
    sendMessage(message) {}

    onDisconnect() {}

    get connected() {
        return this.isReady
    }

}

/**
 * 
 * @enum {string}
 */
Client.EVENTS = {
    INVALID_PAYLOAD: Connection.RESPONSES.INVALID_PAYLOAD.code,
    ACCESS_DENIED: Connection.RESPONSES.ACCESS_DENIED.code,
    NOT_ACCEPTED: Connection.RESPONSES.NOT_ACCEPTED.code,
    JOIN: Connection.RESPONSES.JOIN.code,
    MESSAGE: Connection.RESPONSES.MESSAGE.code

}

export default Client

