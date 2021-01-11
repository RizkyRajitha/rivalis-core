import path from 'path'
import http from 'http'
import express from 'express'
import { Rivalis } from '../../src'
import WebSocketProtocol from './protocol/WebSocketProtocol'


const app = express()
app.use('/', express.static(path.join(__dirname, '../client')))
const server = http.createServer(app)
server.listen(3000)

const rivalis = new Rivalis()
rivalis.protocols.add(new WebSocketProtocol({ server }))
rivalis.initalize().then(() => {
    console.log('rivalis initalized!')
})