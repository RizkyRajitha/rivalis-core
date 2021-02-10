import { Agent } from '../../src'

class WSAgent extends Agent {

    constructor(wsUrl) {
        super()
        const ws = new WebSocket(wsUrl)
        ws.onopen = () => this.ready()
        ws.onmessage = message => {
            const content = JSON.parse(message.data)
            this.handleMessage(content)
        }
        this.sendMessage = message => ws.send(message)
    }

    
}

export default WSAgent