import Adapter from './interfaces/Adapter'
import MessageBrokerAdapter from './interfaces/MessageBrokerAdapter'
import SharedStorageAdapter from './interfaces/SharedStorageAdapter'
import Stage from './interfaces/Stage'
import Protocol from './interfaces/Protocol'
import AuthResolver from './interfaces/AuthResolver'
import LogReporter from './interfaces/LogReporter'
/**
 * @namespace interfaces
 */
export const interfaces = {
    Adapter,
    MessageBrokerAdapter,
    SharedStorageAdapter,
    Stage,
    Protocol,
    AuthResolver,
    LogReporter
}

import MessageBroker from './structs/MessageBroker'
import SharedStorage from './structs/SharedStorage'
import VectorClock from './structs/VectorClock'
import EventEmitter from './structs/EventEmitter'
import CodecExecutor from './structs/CodecExecutor'
import Codec from './structs/Codec'
import Logger from './structs/Logger'
import LoggingFactory from './structs/LoggingFactory'

/**
 * @namespace structs
 */
export const structs = {
    MessageBroker,
    SharedStorage,
    VectorClock,
    EventEmitter,
    CodecExecutor,
    Codec,
    Logger,
    LoggingFactory
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