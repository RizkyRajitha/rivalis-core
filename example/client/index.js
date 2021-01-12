import { Action, Event } from '../../src'

const urlParams = new URLSearchParams(window.location.search)
const contextId = urlParams.get('contextId')
const actorId = urlParams.get('actorId') || 'Bot'

const ws = new WebSocket(`ws://localhost:3000/?contextId=${contextId}&actorId=${actorId}`)
ws.onopen = () => {
    
    setTimeout(() => {
        const action = new Action({
            type: 'chat',
            data: 'hellooo',
            time: new Date().getTime()
        })
        ws.send(JSON.stringify(action))
    }, 1000)
}

ws.onmessage = message => {
    const { data } = message
    const event = new Event(JSON.parse(data))
    event.time.push(new Date().getTime())
    handleEvents(event)
}

/**
 * 
 * @param {Event} event 
 */
const handleEvents = event => {
    const [t1, t2, t3, t4] = event.time
    const ping = ((t4 - t1) - (t3 - t2)) / 2
    console.log(`[${event.senderId}]:`, `(${event.type})`, event.data, actorId === event.senderId ? ping : '')
}

