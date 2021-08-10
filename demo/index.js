import { interfaces, Node } from '../src'
import SimpleAuth from './SimpleAuth'

const node = new Node({
    auth: new SimpleAuth(),
    transports: [ new interfaces.Transport() ],
    reporters: [ new interfaces.LogReporter() ]
})

node.init().then(() => {
    console.log('started')
}).catch(error => {
    console.log(error.message)
})