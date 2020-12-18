import { Rivalis, Action } from '../src'
import LocalMessagingAdapter from './LocalMessagingAdapter'
import LocalQueueAdapter from './LocalQueueAdapter'
import LocalStorageAdapter from './LocalStorageAdapter'
import SimpleAgent from './SimpleAgent'


const localMessagingAdapter = new LocalMessagingAdapter()
// const localQueueAdapter = new LocalQueueAdapter()

const rivalis = new Rivalis()
rivalis.setMessaging(localMessagingAdapter)


const contextId = rivalis.createContext({
    actionHandlers: []
})

const context = rivalis.getContext(contextId)

const node = context.connect('myid')


node.add(event => {
    
})

node.execute()