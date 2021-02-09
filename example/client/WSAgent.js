
class WSAgent {
    
    ws = null

    constructor(contextId, actorId, token) {
        console.log('invoked!')
        this.ws = new WebSocket(`ws://localhost:3000/`)
        this.ws.onopen = () => {
            this.ws.send('helloo')
        }
    }

    execute(action) {

    }
}

export default WSAgent