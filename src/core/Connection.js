import { v4 as uuid } from 'uuid'
import Actor from '../contexts/Actor'
import Action from '../models/Action'
import Connector from './Connector'

class Connection {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @private
     * @type {Connector}
     */
    connector = null

    /**
     * 
     * @type {Actor}
     */
    actor = null

    /**
     * 
     * @param {string} message 
     */
    onmessage = (message) => {}

    /**
     * 
     * @param {string} code 
     * @param {string} message 
     */
    onclose = (code, message) => {}

    /**
     * 
     * @param {Connector} connector 
     */
    constructor(connector) {
        this.id = uuid()
        this.connector = connector
    }

    /**
     * 
     * @param {('close'|'error'|'message')} event 
     * @param {any} data 
     */
    handle(event, data) {

        if (event === 'close') {
            this.dispose()
        }

        if (event === 'error') {
            this.dispose()
        }

        if (event === 'message') {
            this.onMessage(data).then(response => {
                if (response !== null) {
                    this.onmessage(JSON.stringify(response))
                }
            }).catch(response => {
                this.onclose(JSON.stringify(response))
                this.dispose()
            })
        }
    }

    /**
     * 
     * @private
     */
    onInitalize() {

    }

    /**
     * 
     * @private
     * @param {string} data 
     * @returns {Promise.<string>}
     */
    onMessage(data) {
        let message = null
        try {
            message = JSON.parse(data)
        } catch (error) {
            return Promise.reject(Connection.Response.INVALID_PAYLOAD)
        }
        if (!this.isValidInput(message, ['kind', 'content'])) {
            return Promise.reject(Connection.Response.INVALID_PAYLOAD)
        }
        const { kind, content } = message
        if (kind === 'connect') {
            return this.handleConnect(content)
        } else if (kind === 'action') {
            return this.handleAction(content)
        } else {
            return Promise.reject(Connection.Response.INVALID_PAYLOAD)
        }
    }

    handleConnect(content) {
        if (!this.isValidInput(content, ['contextId', 'actorId', 'data'])) {
            return Promise.reject(Connection.Response.INVALID_PAYLOAD)
        }
        const { contextId, actorId, data } = content 
        return this.connector.contextProvider.obtain(contextId).then(context => {
            return context.join(actorId, data)
        }).then(actor => {
            if (this.actor !== null) {
                this.actor.off('message', this.handleMessage, this)
                return this.actor.leave().then(() => actor)
            }
            return actor
        }).then(actor => {
            this.actor = actor
            this.actor.on('message', this.handleMessage, this)
            return Connection.Response.CONNECTION_ESTABLISHED
        }).catch(error => {
            console.error(error)
            throw Connection.Response.ACCESS_DENIED
        })
    }

    /**
     * 
     * @private
     * @param {Object.<string,any>} content 
     */
    handleAction(content) {
        if (this.actor === null) {
            return Promise.reject(Connection.Response.NOT_CONNECTED)
        }
        if (!this.isValidInput(content, ['type', 'data', 'time'])) {
            return Promise.reject(Connection.Response.INVALID_PAYLOAD)
        }
        return this.actor.execute(new Action(content)).then(message => {
            if (message !== null) {
                let response = { ...Connection.Response.MESSAGE }
                response.data = message
                return response
            }
            return null
        }).catch(error => {
            console.error(error)
            return Connection.Response.NOT_ACCEPTED
        })
    }

    /**
     * 
     * @private
     * @param {Message} message 
     */
    handleMessage(message) {
        let response = {
            ...Connection.Response.MESSAGE,
            data: message
        }
        this.onmessage(JSON.stringify(response))
    }

    /**
     * 
     * @param {Object.<string,any>} object 
     * @param {Array.<string>} properties 
     */
    isValidInput(object, properties = []) {
        if (Object.keys(object).length !== properties.length) {
            return false
        }
        for (let property of properties) {
            if (typeof object[property] === 'undefined') {
                return false
            }
        }
        return true
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        return Promise.resolve().then(() => {
            if (this.actor !== null) {
                return this.actor.leave()
            }
        }).then(() => {
            this.actor = null
            return this.connector.disconnect(this)
        })
    }

}


/**
 * @typedef {ErrorMessage}
 * @param {string} code
 * @param {string} data
 */

/**
 * 
 * @enum {ErrorMessage}
 */
Connection.Response = {
    INVALID_PAYLOAD: { code: 'invalid_payload' },
    ACCESS_DENIED: { code: 'access_denied' },
    NOT_CONNECTED: { code: 'not_connected' },
    NOT_ACCEPTED: { code: 'not_accepted' },

    CONNECTION_ESTABLISHED: { code: 'connection_established' },
    MESSAGE: { code: 'message', data: null }

}

export default Connection