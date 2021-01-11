import { IncomingMessage } from 'http'
import WebSocket, { Server as WSServer, ServerOptions } from 'ws'
import { Protocol } from '../../../src'

class WebSocketProtocol extends Protocol {

    nodes = []

    /**
     * 
     * @type {WSServer}
     */
    server = null

    /**
     * 
     * @param {ServerOptions} options 
     */
    constructor(options = null) {
        super('websocket')
        this.server = new WSServer(options)
    }

    initalize() {
        this.server.on('connection', (socket, request) => {
            this.onConnect(socket, request, node)
        })
    }

    getNodes() {}

    /**
     * 
     * @private
     * @param {WebSocket} socket 
     * @param {IncomingMessage} request 
     */
    onConnect = (socket, request, node) => {
        socket.on('message', message => {
            
            console.log(message)
            // node.execute(message)
        })

        socket.on('close', () => {
            
        })
    }

}

export default WebSocketProtocol