import { Context, Node } from '../src'
import Logger from '../src/core/Logger'
import GameWorld from './GameWorld'
import SimpleAuth from './SimpleAuth'

const node = new Node({
    auth: new SimpleAuth(),
    loggerLevel: Logger.LEVEL.DEBUG
})

node.run().then(async () => {
    node.rooms.define('world', new GameWorld())
    node.rooms.on('create', room => console.log(room))
    await node.rooms.create('world1', 'world', { pvp: false })
    let rooms = await node.rooms.getAll()
    console.log(rooms)
    console.log(node.rooms.list)
}).catch(error => {
    console.error(error)
})