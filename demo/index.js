import { Context, Node } from '../src'
import Logger from '../src/core/Logger'
import Event from '../src/models/Event'
import GameWorld from './GameWorld'
import SimpleAuth from './SimpleAuth'

const node = new Node({
    auth: new SimpleAuth(),
    loggerLevel: Logger.LEVEL.TRACE
})

node.run().then(async () => {
    node.rooms.define('world', new GameWorld())
    await node.rooms.create('world1', 'world', { pvp: false })
    let room = await node.rooms.obtain('world1')
    let actor = await room.actors.join('test', { code: '12WXWQ' })
    actor.events.on('event', event => console.log(event))
    actor.events.on('leave', () => console.log('leave'))
    await room.execute(actor, 'actions.test', { 1: 1, 2: 2 })
    await room.actors.leave(actor)
}).catch(error => {
    console.error(error)
})