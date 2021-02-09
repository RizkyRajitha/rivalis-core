import ContextProvider from '../contexts/ContextProvider'
import Connection from './Connection'

class Connector {

    /**
     * 
     * @private
     * @type {ContextProvider}
     */
    contextProvider = null

    /**
     * 
     * @type {Map.<string, Connection>}
     */
    connections = new Map()
    
    /**
     * 
     * @protected
     * @returns {Promise.<any>}
     */
    initialize() {}

    /**
     * 
     * @returns {Connection}
     */
    connect() {
        let connection = new Connection(this)
        this.connections.set(connection.id, connection)
        connection.handle('open')
        return connection
    }

    /**
     * 
     * @private
     * @param {Connection} connection 
     */
    disconnect(connection) {
        this.connections.delete(connection.id)
        connection.dispose()
    }

}

/**
 * @typedef {ErrorMessage}
 * @param {string} code
 * @param {string} cause
 */

/**
 * 
 * @enum {ErrorMessage}
 */
Connector.Error = {
    INVALID_PAYLOAD: { code: 'invalid_payload' }
}

export default Connector