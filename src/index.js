import Adapter from './interfaces/Adapter'
import MessageBrokerAdapter from './interfaces/MessageBrokerAdapter'
import SharedStorageAdapter from './interfaces/SharedStorageAdapter'

/**
 * @namespace interfaces
 */
export const interfaces = {
    Adapter,
    MessageBrokerAdapter,
    SharedStorageAdapter
}

import MessageBroker from './structs/MessageBroker'
import SharedStorage from './structs/SharedStorage'
import VectorClock from './structs/VectorClock'

/**
 * @namespace structs
 */
export const structs = {
    MessageBroker,
    SharedStorage,
    VectorClock
}

import Context from './core/Context'
import Activity from './core/Activity'
import Event from './core/Event'

export {
    Context,
    Activity,
    Event
}