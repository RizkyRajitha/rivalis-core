import Adapter from './interfaces/Adapter'
import MessageBrokerAdapter from './interfaces/MessageBrokerAdapter'
import SharedStorageAdapter from './interfaces/SharedStorageAdapter'
import Stage from './interfaces/Stage'
import Protocol from './interfaces/Protocol'
import AuthResolver from './interfaces/AuthResolver'
/**
 * @namespace interfaces
 */
export const interfaces = {
    Adapter,
    MessageBrokerAdapter,
    SharedStorageAdapter,
    Stage,
    Protocol,
    AuthResolver
}

import MessageBroker from './structs/MessageBroker'
import SharedStorage from './structs/SharedStorage'
import VectorClock from './structs/VectorClock'
import EventEmitter from './structs/EventEmitter'

/**
 * @namespace structs
 */
export const structs = {
    MessageBroker,
    SharedStorage,
    VectorClock,
    EventEmitter
}

import Context from './core/Context'
import Activity from './core/Activity'
import Actor from './core/Actor'
import Event from './core/Event'
import Node from './core/Node'
import Exception from './core/Exception'

export {
    Context,
    Activity,
    Actor,
    Event,
    Node,
    Exception
}