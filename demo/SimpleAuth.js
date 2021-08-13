import { interfaces } from '../src'

class SimpleAuth extends interfaces.AuthResolver {
    
    async onAuth(ticket, node) {
        let [ roomId, actorId ] = ticket.split(':')
        let room = await node.rooms.obtain(roomId)
        return room.actors.join(actorId)
    }

}

export default SimpleAuth