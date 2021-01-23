import EventEmitter from 'eventemitter3'

class WSAgent extends EventEmitter {
    
    ws = null

    constructor(contextId, actorId, token) {
        super()
        this.ws = new WebSocket(`ws://localhost:3000/?contextId=${contextId}&actorId=${actorId}&token=${token}`)
        
    }

    execute(action) {

    }
}

export default WSAgent