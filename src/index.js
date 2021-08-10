import AuthResolver from './interfaces/AuthResolver'
import Persistence from './interfaces/Persistence'
import LogReporter from './interfaces/LogReporter'
import Transport from './interfaces/Transport'
/**
 * @namespace interfaces
 */
const interfaces = {
    AuthResolver,
    Persistence,
    LogReporter,
    Transport
}

import Actor from './core/Actor'
import Config from './core/Config'
import Exception from './core/Exception'
import Node from './core/Node'
import InMemoryStore from './adapters/InMemoryStore'

export { Node, Config, Actor, Exception, InMemoryStore, interfaces }