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

export default Connector