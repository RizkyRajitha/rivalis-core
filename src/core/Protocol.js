import ContextProvider from '../contexts/ContextProvider'
import Connection from './Connection'

class Protocol {

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
        return connection
    }

    /**
     * 
     * @private
     * @param {Connection} connection 
     */
    disconnect(connection) {
        this.connections.delete(connection.id)
    }

}

/**
 * 
 * @param {Protocol} protocol
 * @returns {boolean} 
 */
Protocol.isProtocol = (protocol = null) => {
    if (typeof protocol !== 'object') {
        return false
    }
    let proto = (Object.getPrototypeOf(protocol) || {}).constructor
    if (typeof proto !== 'function') {
        return false
    }
    if (Object.getPrototypeOf(proto).name === 'Protocol') {
        return true
    }
    return false
}

export default Protocol