import url from 'url'
import WebSocket, { Server as WSServer, ServerOptions } from 'ws'
import { Action, Connector } from '../../../src'
import Actor from '../../../src/Actor'

class WebSocketConnector extends Connector {

    /**
     * 
     * @param {ServerOptions} options 
     */
    constructor(options = null) {
        super('websocket')
        this.server = new WSServer(options)
    }

    run() {
        this.server.on('connection',(websocket, request) => {
            const queries = {}
            for (let queryParam of url.parse(request.url).query.split('&')) {
                const [key, value] = queryParam.split('=')
                queries[key] = value
            }
            
            const { contextId, actorId } = queries
            
            this.obrainActor(contextId, actorId).then(actor => {
                this.handleConnection(websocket, actor)
            }).catch(error => {
                console.error(error)
                const code = error.code || 1008
                websocket.send(error.stack, () => {
                    websocket.close(code, error.message)
                })
            })
        })
    }

    /**
     * 
     * @param {WebSocket} websocket 
     * @param {Actor} actor 
     */
    handleConnection(websocket, actor) {
        actor.synctronize()
        websocket.on('message', message => {
            const data = JSON.parse(message)
            const action = new Action(data)
            actor.execute(action).catch(error => {
                
            })
        })

        actor.add(events => {
            websocket.send(JSON.stringify(events))
        })
    }
}

export default WebSocketConnector