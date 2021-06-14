import Adapter from './adapters/Adapter'
import LoggingAdapter from './adapters/LoggingAdapter'
import MessageBrokerAdapter from './adapters/MessageBrokerAdapter'
import SharedStorageAdapter from './adapters/SharedStorageAdapter'
import LocalAdapter from './adapters/LocalAdapter'
import BasicLoggingAdapter from './adapters/BasicLoggingAdapter'
import InMemoryStorageAdapter from './adapters/InMemoryStorageAdapter'
import LocalMessageBrokerAdapter from './adapters/LocalMessageBrokerAdapter'

/**
 * 
 * @namespace adapters
 */
export const adapters = {
    Adapter,
    LoggingAdapter,
    MessageBrokerAdapter,
    SharedStorageAdapter,
    LocalAdapter,
    BasicLoggingAdapter,
    InMemoryStorageAdapter,
    LocalMessageBrokerAdapter
}

import VectorClock from './structs/VectorClock'

/**
 * 
 * @namespace structs
 */
export const structs = {
    VectorClock
}

import Logger from './utils/Logger'
import MessageBroker from './utils/MessageBroker'
import SharedStorage from './utils/SharedStorage'
/**
 * 
 * @namespace utils
 */
export const utils = {
    Logger,
    MessageBroker,
    SharedStorage
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