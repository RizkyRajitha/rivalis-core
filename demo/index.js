import { Node, Stage } from '../src'
import Logger from '../src/core/Logger'
import SimpleAuth from './SimpleAuth'

const node = new Node({
    auth: new SimpleAuth(),
    loggerLevel: Logger.LEVEL.DEBUG
})

class World extends Stage {

    

}

node.run().then(async () => {
    node.rooms.define('world', new World())
    await node.rooms.create('world1', 'world', { pvp: false })
    await node.rooms.create('world2', 'world', { pvp: false })
    await node.rooms.create('world3', 'world', { pvp: false })
    await node.rooms.obtain('world1')
    await node.rooms.omit('world1')
    await node.rooms.obtain('world1')
    let rooms = await node.rooms.getAll()
    console.log(rooms)
    console.log(node.rooms.list)
}).catch(error => {
    console.error(error)
    
})