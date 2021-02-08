import { InMemoryAdapter, Rivalis, Context, Action, Message } from '../../src'
import PvPStage from './stages/PvPStage'
const gameserver = new Rivalis({
    adapter: new InMemoryAdapter(),
    connectors: [ ]
})

gameserver.initialize().then(() => {
    gameserver.stages.define('pvp', new PvPStage())
    gameserver.contexts.on('create', contextInfo => {
        console.log('Event: context created', contextInfo.id)
    })
    gameserver.contexts.on('dispose', contextInfo => {
        console.log('Event: context disposed', contextInfo.id)
    })
    return createContext()
}).then(() => {
    return gameserver.contexts.getAll()
}).then(contexts => {
    let promises = []
    contexts.forEach(contextInfo => {
        promises.push(gameserver.contexts.dispose(contextInfo.id))
    })
    return Promise.all(promises)
}).then(() => {
    
})

const createContext = () => {
    return gameserver.contexts.create('pvp', { map: 'dust2' }).then(contextInfo => {
        return gameserver.contexts.obtain(contextInfo.id)
    }).then(context => {
        return Promise.all([
            connectPlayer(context, 'player1'),
            connectPlayer(context, 'player2'),
            connectPlayer(context, 'player3')
        ])
    }).catch(error => {
        console.error(error)
    })
}

/**
 * 
 * @param {Context} context 
 * @param {*} name 
 */
const connectPlayer = (context, name) => {
    return context.join(name, { name }).then(actor => {
        actor.on('message', message => {
            console.log(`received by ${name}:`, Message.getPing(message), Message.getProcessingTime(message))
        })
        return actor.execute(new Action({ type:'chat.message', data: 'test', time: new Date().getTime() }))
    }).catch(error => {
        console.error(error)
    })
}