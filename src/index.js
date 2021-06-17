import Adapter from './interfaces/Adapter'
import LoggingAdapter from './interfaces/LoggingAdapter'
import MessageBrokerAdapter from './interfaces/MessageBrokerAdapter'
import SharedStorageAdapter from './interfaces/SharedStorageAdapter'

/**
 * 
 * @namespace interfaces
 */
export const interfaces = {
    Adapter,
    LoggingAdapter,
    MessageBrokerAdapter,
    SharedStorageAdapter
}

import Logger from './structs/Logger'
import MessageBroker from './structs/MessageBroker'
import SharedStorage from './structs/SharedStorage'
import VectorClock from './structs/VectorClock'
/**
 * 
 * @namespace structs
 */
export const structs = {
    Logger,
    MessageBroker,
    SharedStorage,
    VectorClock
}

import Context from './core/Context'
import Activity from './core/Activity'
import Actor from './core/Actor'
import Event from './core/Event'

export {
    Context,
    Activity,
    Actor,
    Event
}