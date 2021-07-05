import Actor from '../core/Actor'
import Rivalis from '../core/Rivalis'
import Exception from '../core/Exception'
import Logger from '../core/Logger'
import AuthResolver from '../core/AuthResolver'

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
        let auth = {
            contextId: null,
            actorId: null,
            data: null
        }
        return Promise.resolve().then(() => Rivalis.getAuthResolver(this.rivalis).onAuth(ticket)).then(authObject => {
            AuthResolver.validate(authObject)
            auth.contextId = authObject.contextId
            auth.actorId = authObject.actorId
            auth.data = authObject.data
            return this.rivalis.contexts.obtain(auth.contextId)
        }).then(context => {
            return context.actors.join(auth.actorId, auth.data)
        }).then(actor => {
            this.getLogger().debug(`actor id=(${auth.actorId}) connected to context id=(${auth.contextId})`)
            return actor
        })
    }

    /**
     * @protected
     * @param {string} namespace
     * @returns {Logger}
     */
    getLogger(namespace = 'default') {
        return this.rivalis.logging.getLogger(`protocol:${namespace}`)
    }

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    handle() {
        return Promise.reject(new Exception('Protocol#handle is not implemented'))
    }

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    dispose() {
        return Promise.reject(new Exception('Protocol#dispose is not implemented'))
    }

}

/**
 * 
 * @param {Protocol} protocol 
 * @param {Rivalis} rivalis
 * @returns {Promise.<void>}
 */
Protocol.handle = (protocol, rivalis) => {
    protocol.rivalis = rivalis
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