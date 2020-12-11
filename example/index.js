import { Rivalis, Entity, AdapterHolder, Action } from '../src'
import LocalMessagingAdapter from './LocalMessagingAdapter'
import LocalQueueAdapter from './LocalQueueAdapter'
import LocalStorageAdapter from './LocalStorageAdapter'
import SimpleAgent from './SimpleAgent'

/** @type {Rivalis} */
let rivalis = null

const localMessagingAdapter = new LocalMessagingAdapter()
const localQueueAdapter = new LocalQueueAdapter()
const localStorageAdapter = new LocalStorageAdapter()

const adapterHolder = new AdapterHolder(localStorageAdapter, localMessagingAdapter, localQueueAdapter)
adapterHolder.initialize().then(() => {
    rivalis = new Rivalis(adapterHolder)
    setTimeout(() => createSession(), 400)
})


const createSession = () => {
    const player1 = new Entity('player1', {})
    const player2 = new Entity('player2', {})
    const player3 = new Entity('player3', {})
    const player4 = new Entity('player4', {})

    const group1 = new Entity('group1', {})
    const group2 = new Entity('group2', {})
    rivalis.sessions.create([player1, player2, player3, player4], [group1, group2], { type: 'competitive' }).then(id => {
        setTimeout(() => connect(id, 'player1'), 1000)
        setTimeout(() => connect(id, 'player2'), 2000)
        setTimeout(() => connect(id, 'player3'), 3000)
        setTimeout(() => connect(id, 'player4'), 4000)
    })
}

const connect = (sessionId, playerId) => {
    rivalis.sessions.get(sessionId, playerId).then(session => {
        execute(new SimpleAgent(playerId, session))
    })    
}

/**
 * 
 * @param {SimpleAgent} agent 
 */
const execute = agent => {
    agent.on('event', event => {
        console.log(`received from ${agent.id}:`, event.data)
    })
    setInterval(() => {
        let sendTo = 'player' + (Math.floor(Math.random() * 4) + 1)
        agent.dispatch(new Action('message', {
            to: sendTo,
            message: `lick my balls ${sendTo} by ${agent.id}`
        }))
    }, 1000)
}