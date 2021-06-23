import Actor from '../core/Actor'
import Node from '../core/Node'
import Exception from '../helpers/Exception'
import AuthResolver from './AuthResolver'

class Protocol {

    /**
     * @protected
     * @type {Node}
     */
    node = null

    /**
     * @protected
     * @param {string} ticket 
     * @returns {Promise.<Actor>}
     */
    connect(ticket) {
        let auth = { contextId: null, actorId: null, data: null }
        return Promise.resolve().then(() => Node.getAuthResolver(this.node).onAuth(ticket)).then(authObject => {
            auth = authObject
            return this.node.obtain(auth.contextId)
        }).then(context => {
            return context.actors.join(auth.actorId, auth.data)
        })
    }

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    handle() {
        return Promise.reject(new Exception('Protocol#handle is not implemented', Exception.Code.INTERNAL))
    }

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    dispose() {
        return Promise.reject(new Exception('Protocol#dispose is not implemented', Exception.Code.INTERNAL))
    }

}

/**
 * 
 * @param {Protocol} protocol 
 * @param {Node} node 
 */
Protocol.setNode = (protocol, node) => {
    protocol.node = node
}

/**
 * 
 * @param {Protocol} protocol 
 * @returns {Promise.<void>}
 */
Protocol.handle = protocol => {
    return protocol.handle()
}

/**
 * 
 * @param {Protocol} protocol
 * @returns {Promise.<void>} 
 */
Protocol.dispose = protocol => {
    return protocol.dispose()
}

export default Protocol