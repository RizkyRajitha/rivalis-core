import path from 'path'
import http from 'http'
import express from 'express'
import { Rivalis } from '../../src'
import WebSocketConnector from './connector/WebSocketConnector'
import InMemoryListStorageAdapter from './adapters/InMemoryListStorageAdapter'
import InMemoryKVStorageAdapter from './adapters/InMemoryKVStorageAdapter'
import InMemoryMessagingAdapter from './adapters/InMemoryMessagingAdapter'

import chat from './actions/chat'

import context from './routes/context'

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