import { interfaces, Node } from '../src'
import SimpleAuth from './SimpleAuth'

const node = new Node({
    auth: new SimpleAuth()
})

