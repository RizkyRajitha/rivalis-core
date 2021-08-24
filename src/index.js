import AuthResolver from './interfaces/AuthResolver'
import Persistence from './interfaces/Persistence'
import LogReporter from './interfaces/LogReporter'
import Transport from './interfaces/Transport'
import Compression from './interfaces/Compression'

/**
 * @namespace interfaces
 */
const interfaces = {
    AuthResolver,
    Persistence,
    LogReporter,
    Transport,
    Compression
}

import ActorEntry from './models/ActorEntry'
import RoomEntry from './models/RoomEntry'

/**
 * @namespace models
 */
const models = {
    ActorEntry, RoomEntry
}

import Broadcast from './structs/Broadcast'
import Broker from './structs/Broker'
import Clock from './structs/Clock'
import Codec from './structs/Codec'
import EventEmitter from './structs/EventEmitter'
import VectorClock from './structs/VectorClock'

/**
 * @namespace structs
 */
const structs = {
    Broadcast, Broker, Clock, Codec, EventEmitter, VectorClock
}

import TransportCodec from './utils/TransportCodec'
/**
 * @namespace utils
 */
const utils = {
    TransportCodec
}

import Action from './core/Action'
import Actions from './core/Actions'
import Actor from './core/Actor'
import Config from './core/Config'
import Context from './core/Context'
import Event from './core/Event'
import Exception from './core/Exception'
import Logger from './core/Logger'
import Node from './core/Node'
import Room from './core/Room'
import Stage from './core/Stage'
import InMemoryStore from './adapters/InMemoryStore'
import BasicLogReporter from './adapters/BasicLogReporter'
import LZStringCompression from './adapters/LZStringCompression'
import Plugin from './core/Plugin'

export {
    Action, Actions, Actor, Config, Context, Event,
    Exception, Logger, Node, Room, Stage, InMemoryStore,
    BasicLogReporter, LZStringCompression, Plugin,
    interfaces,
    models,
    structs,
    utils
}