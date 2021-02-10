import { Signal } from "signals"

class WSAgent {
    
    ws = null

    onMessage = new Signal()

    constructor(contextId, actorId, token) {
        console.log('invoked!')
        this.ws = new WebSocket(`ws://localhost:3000/`)
        this.ws.onopen = () => this.init()
        this.ws.onmessage = message => this.onMessage.dispatch(JSON.parse(message))
    }

    init() {
        this.connect('test', 'player' + Math.floor(Math.random() * 10), { nickname: 'hehe' })
        setTimeout(() => {
            this.execute('chat.message', 'hellooo')
        }, 2000)
    }

    connect(contextId, actorId, data) {
        let sendable = { kind: 'connect', content: { contextId, actorId, data } }
        this.ws.send(JSON.stringify(sendable))
    }

    execute(type, data) {
        let sendable = { kind: 'action', content: { type, data, time: new Date().getTime() } }
        this.ws.send(JSON.stringify(sendable))
    }
}

export default WSAgent