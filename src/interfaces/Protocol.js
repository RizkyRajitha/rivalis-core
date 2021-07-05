import Actor from '../core/Actor'
import Rivalis from '../core/Rivalis'
import Exception from '../core/Exception'
import Logger from '../core/Logger'

class Protocol {

    /**
     * @protected
     * @type {Rivalis}
     */
    rivalis = null

    /**
     * @protected
     * @param {string} ticket 
     * @returns {Promise.<Actor>}
     */
    connect(ticket) {
        let auth = { contextId: null, actorId: null, data: null }
        return Promise.resolve().then(() => Rivalis.getAuthResolver(this.rivalis).onAuth(ticket)).then(authObject => {
            auth = authObject // TODO: validate object before sending forward
            return this.rivalis.obtain(auth.contextId)
        }).then(context => {
            return context.actors.join(auth.actorId, auth.data)
        })
    }

    /**
     * @protected
     * @returns {Logger}
     */
    getLogger() {
        return this.node.logging.getLogger('protocol')
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