import { Server as WSServer, ServerOptions } from 'ws'
import { Connector } from '../../src'

class WebSocketConnector extends Connector {
    
    /**
     * @private
     * @type {WSServer}
     */
    server = null

    /**
     * 
     * @type {ServerOptions}
     */
    options = null

    /**
     * 
     * @param {ServerOptions} options 
     */
    constructor(options) {
        super()
        this.options = options
    }

    initialize() {
        this.server = new WSServer(this.options)
        this.server.on('connection', socket => {
            const connection = this.connect()
            
            connection.onmessage = message => socket.send(message)
            connection.onclose = (code, message) => socket.close(code, message)

            socket.on('close', () => connection.handle('close'))
            socket.on('error', () => connection.handle('error'))
            socket.on('message', message => connection.handle('message', message))
        })
    }
}

export default WebSocketConnector