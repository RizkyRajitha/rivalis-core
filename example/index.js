import { Rivalis, Action, Event } from '../src/index'
import VectorClock from '../src/struct/VectorClock'
import LocalMessagingAdapter from './LocalMessagingAdapter'


const localMessagingAdapter = new LocalMessagingAdapter()
// const localQueueAdapter = new LocalQueueAdapter()

const rivalis = new Rivalis()
rivalis.setMessaging(localMessagingAdapter)


const contextId = rivalis.createContext({
    actionHandlers: []
})

const context = rivalis.getContext(contextId)
context.initialize()

const setupNode = (name, initial = false) => {
    
    const received = []

    let imReady = false
    let gameStarted = false
    let readyCount = 0

    /** @type {Array.<Event>} */
    let eventList = []
    
    const node = context.connect(name)
    node.add(event => {
        received.push(event.clock)
        eventList.push(event)

        if (event.type === 'ready' && event.data) {
            readyCount++
            if (event.senderId === node.id) {
                imReady = event.data
            }
            if (readyCount === 3) {
                node.execute(new Action('startgame', true))
                console.log(`${node.id}: I will start my game!`)
            }
        }

        if (event.type === 'startgame' && event.data) {
            if (event.senderId === node.id) {
                gameStarted = true
                setTimeout(() => node.execute(new Action('heal', node.id)), 40)
                console.log(`${node.id}: I'm healing myself!`)
            } else if (gameStarted) {
                setTimeout(() => {
                    node.execute(new Action('sayhi', event.senderId))
                }, Math.floor(Math.random() * 1000))
            }
        }

        if (event.type === 'sayhi' && event.data === node.id) {
            console.log(`[${node.id}]: ${event.senderId} say hi to me!`)
            node.execute(new Action('hi', event.senderId))
        }

        if (event.type === 'hi' && event.data === node.id) {
            console.log(`[${node.id}]: ${event.senderId} hi back!`)
        }


    })

    setTimeout(() => {
        node.execute(new Action('ready', true))
    }, Math.round(Math.random() * 100))

    setTimeout(() => {
        console.log(`${node.id}:`, JSON.stringify(eventList.map(event => `${event.senderId}:${event.type}`)), eventList.length)
    }, 5000)

    setTimeout(() => {
        console.log('===============================')
    }, 5500)

    setTimeout(() => {
       
        eventList = eventList.sort((eventA, eventB) => {
            const vectorClock1 = new VectorClock(eventA.senderId, eventA.clock)
            const vectorClock2 = new VectorClock(eventB.senderId, eventB.clock)
            let result = VectorClock.compare(vectorClock1, vectorClock2)
            return result
        })
        
        console.log(`${node.id}:`, JSON.stringify(eventList.map(event => `${event.senderId}:${event.type}`)), eventList.length)
    }, 6000)
}

setupNode('1')
setupNode('2')
setupNode('3')