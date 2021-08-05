import AuthResolver from './interfaces/AuthResolver'

/**
 * @namespace interfaces
 */
const interfaces = {
    AuthResolver
}

import Actor from './core/Actor'
import Config from './core/Config'
import Exception from './core/Exception'
import Node from './core/Node'
import InMemoryPersistence from './core/InMemoryPersistence'

export { Node, Config, Actor, Exception, InMemoryPersistence, interfaces }