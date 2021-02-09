import { Rivalis } from '../../src'
import PvPStage from './stages/PvPStage'
import WebSocketConnector from './WebSocketConnector'
import path from 'path'
import http from 'http'
import express from 'express'


const app = express()
const server = http.createServer(app)

const gameserver = new Rivalis({
    connectors: [ new WebSocketConnector({ server }) ]
})

server.listen(3000, () => {
    console.log('server started')
})

app.use('/', express.static(path.join(__dirname, '../client')))

gameserver.initialize().then(() => {
    gameserver.stages.define('pvp', new PvPStage())
    gameserver.contexts.on('create', contextInfo => {
        console.log('Event: context created', contextInfo.id)
    })
    gameserver.contexts.on('dispose', contextInfo => {
        console.log('Event: context disposed', contextInfo.id)
    })
    return gameserver.contexts.create('pvp', { map: 'dust2' })
}).then(() => {
    return gameserver.contexts.getAll()
}).catch(error => {
    console.error(error)
})