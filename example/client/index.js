import {} from '../../src'

const ws = new WebSocket('ws://localhost:3000/test')
ws.onopen = () => {
    setInterval(() => ws.send(JSON.stringify({ time: new Date().getMilliseconds(), type: 'chat', data: 'helloooo' })), 2000)
}

ws.onmessage = message => {
    
    console.log('received message', ping)
}

