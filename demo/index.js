import { Context, Node } from '../src'
import Logger from '../src/core/Logger'
import GameWorld from './GameWorld'
import SimpleAuth from './SimpleAuth'

const node = new Node({
    auth: new SimpleAuth(),
    loggerLevel: Logger.LEVEL.TRACE
})

const a = () => {
    return 'test'
}

node.run().then(async () => {
    node.rooms.define('world', new GameWorld())
    await node.rooms.create('world1', 'world', { pvp: false })
    let actor = await node.authorize('world1:testactor')
}).catch(error => {
    console.error(error)
})