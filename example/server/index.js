import path from 'path'
import http, { Server } from 'http'
import express from 'express'
import { Rivalis } from '../../src'
import WebSocketConnector from './connector/WebSocketConnector'
import InMemoryListStorageAdapter from './adapters/InMemoryListStorageAdapter'
import InMemoryKVStorageAdapter from './adapters/InMemoryKVStorageAdapter'
import InMemoryMessagingAdapter from './adapters/InMemoryMessagingAdapter'

import chat from './actions/chat'

import context from './routes/context'
import Adapter from '../../src/adapter/Adapter'

const app = express()
const server = http.createServer(app)

const rivalis = new Rivalis({
    adapters: {
        kvStorage: new InMemoryKVStorageAdapter(),
        listStorage: new InMemoryListStorageAdapter(),
        messaging: new InMemoryMessagingAdapter()
    },
    connectors: [
        new WebSocketConnector({ server })
    ]
})

app.use('/', express.static(path.join(__dirname, '../client')))
app.use('/contexts', context(rivalis))

rivalis.actions.use('chat', chat)


rivalis.initialize().then(() => server.listen(3000)).catch(error => {
    console.log(error.message)
})

////////////// NEW API

class Context {

    stage = null

    

}



class PvPStage extends Stage {

    onInit(context) {

    }

    onCreate(context, settings) {

        context.actions.on('message', action => {
            return new Response({
                type: Response.Type.Event, // || Response.Type.Message
                data: {}
            })
        })
    }

    onJoin(context, id, data) {
        context.storage.set()
    }

    onLeave(context, id) {

    }

    onDispose(context) {

    }
}


const gameserver = new Server({
    presence: new InMemoryPresence(),
    connectors: [ new WebSocketConnector({ server }) ]
})



gameserver.stage.define('pvpGame', new PvPStage())
gameserver.initalize().then(() => {
    return gameserver.context.create('pvpGame', { })
}).then(context => {
    return context.join(id, {})
    context.leave(id)
    context.dispose()
    context.actors.getAll()
}).then(actor => {
    actor.on('event', event => {

    })

    actor.on('message', data => {

    })

    actor.on('terminate', () => {
        
    })

    actor.execute(action)

    actor.terminate()
})
