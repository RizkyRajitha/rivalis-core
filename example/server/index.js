import path from 'path'
import http from 'http'
import express from 'express'
import { Rivalis } from '../../src'
import WebSocketProtocol from './protocol/WebSocketProtocol'


const app = express()
app.use('/', express.static(path.join(__dirname, '../client')))
const server = http.createServer(app)

const rivalis = new Rivalis({
    protocols: [
        new WebSocketProtocol({ server })
    ]
})

rivalis.actions.register('chat', () => 'yes boss')

rivalis.run().then(() => {
    server.listen(3000)
    console.log('rivalis initalized!')
    rivalis.contexts.createContext().then(contextInfo => {
        console.log('created context', contextInfo.id)
    })
})

