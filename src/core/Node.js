import Exception from '../helpers/Exception'
import Adapter from '../interfaces/Adapter'
import AuthResolver from '../interfaces/AuthResolver'
import Protocol from '../interfaces/Protocol'
import Stage from '../interfaces/Stage'
import NodePersistence from '../persistence/NodePersistence'
import Persistence from '../persistence/Persistence'
import Context from './Context'

class Node {

    /**
     * @private
     * @type {NodePersistence}
     */
    persistence = null

    /**
     * @private
     * @type {Adapter}
     */
    adapter = null

    /**
     * @private
     * @type {AuthResolver}
     */
    authResolver = null

    /**
     * @private
     * @type {Array.<Protocol>}
     */
    protocols = null

    /**
     * @private
     * @type {Map.<string,Context>}
     */
    contexts = null

    /**
     * @private
     * @type {Map.<string,Stage>}
     */
    stages = null
    
    /**
     * 
     * @param {Adapter} adapter 
     * @param {AuthResolver} authResolver
     */
    constructor(adapter, authResolver) {
        this.adapter = adapter
        this.authResolver = authResolver || new AuthResolver()
        this.protocols = []
        this.contexts = new Map()
        this.stages = new Map()
    }

    run() {
        return this.adapter.initialize().then(() => {
            this.persistence = new NodePersistence(this.adapter)
            return this.persistence.initialize()
        }).then(() => {
            this.persistence.events.subscribe(this.handleEvent, this)
        })
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    shutdown() {
        this.persistence.events.unsubscribe(this.handleEvent, this)
        this.stages.clear()
        let promises = []
        this.contexts.forEach(context => promises.push(context.dispose()))
        this.protocols.forEach(protocol => promises.push(protocol.dispose()))
        return Promise.all(promises).then(() => {
            return this.persistence.dispose()
        }).then(() => {
            return this.adapter.dispose()
        })
    }

    /**
     * 
     * @param {string} contextId 
     * @param {string} type 
     * @returns {Promise.<void>}
     */
    create(contextId, type) {
        if (!this.stages.has(type)) {
            return Promise.reject(new Exception(`stage type=(${type}) is not defined`, Exception.Code.INTERNAL))
        }
        this.persistence.contexts.savenx(contextId, { id: contextId, type }).then(persisted => {
            if (!persisted) {
                throw new Exception(`context=(${contextId}) already exist!`, Exception.Code.INTERNAL)
            }
        })
    }

    /**
     * 
     * @param {string} contextId 
     * @returns {Promise.<void>}
     */
    destroy(contextId) {
        return this.persistence.contexts.get(contextId).then(context => {
            if (context) {
                return this.persistence.events.emit({ key: 'destroy', data: contextId })
            }
            throw new Exception(`context=(${contextId}) doesn't exist!`, Exception.Code.INTERNAL)
        }).then(() => {
            return this.persistence.contexts.delete(contextId)
        }).then(() => {
            let persistence = new Persistence(contextId, this.adapter)
            return persistence.clear()
        })
    }

    /**
     * 
     * @param {string} contextId
     * @returns {Promise.<Context>} 
     */
    obtain(contextId) {
        return this.persistence.contexts.get(contextId).then(context => {
            if (context === null) {
                throw new Exception(`context=(${contextId}) doesn't exist!`, Exception.Code.CONTEXT_NOT_EXIST)
            }
            const { id, type } = context
            if (!this.stages.has(type)) {
                throw new Exception(`stage=(${type}) is not available on this node`, Exception.Code.INTERNAL)
            }
            let contextInstance = new Context(id, this.adapter, this.stages.get(type))
            this.contexts.set(contextId, contextInstance)
            return contextInstance.initialize()
        }).then(() => {
            return this.contexts.get(contextId)
        })
    }

    /**
     * 
     * @param {string} type 
     * @param {Stage} stage
     * @returns {this} 
     */
    define(type, stage) {
        if (this.stages.has(type)) {
            throw new Exception(`stage=(${type}) already exist!`, Exception.Code.INTERNAL)
        }
        this.stages.set(type, stage)
        return this
    }

    /**
     * 
     * @param {Protocol} protocol 
     * @returns {this}
     */
    enable(protocol) {
        Protocol.setNode(protocol, this)
        Protocol.handle(protocol)
        return this
    }

    /**
     * 
     * @returns {Promise.<Array.<Object.<string,any>>>}
     */
    getAll() {
        return this.persistence.contexts.getAll().then(contexts => {
            let list = []
            contexts.forEach(context => list.push(context))
            return list
        })
    }

    /**
     * @private
     * @param {Object.<string,any>} event 
     */
    handleEvent({ key, data }) {
        if (key === 'destroy') {
            let context = this.contexts.get(data)
            if (context) {
                context.dispose().then(() => {
                    this.contexts.delete(context.id)
                })
            }
        }
    }

}

/**
 * 
 * @param {Node} node 
 * @returns {AuthResolver}
 */
Node.getAuthResolver = node => {
    return node.authResolver
}

export default Node

