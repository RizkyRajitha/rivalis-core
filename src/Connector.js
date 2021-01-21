import { v4 as uuid } from 'uuid'
import Actor from './Actor'
import ContextProvider from './core/ContextProvider'

class Connector {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {string}
     */
    type = null

    /**
     * 
     * @private
     * @type {ContextProvider}
     */
    contexts = null

    /**
     * 
     * @param {string} type 
     */
    constructor(type) {
        this.id = uuid()
        this.type = type
    }

    /**
     * 
     * @private
     * @param {ContextProvider} contexts 
     */
    initalize(contexts) {
        this.contexts = contexts
        return this.run()
    }

    /**
     * 
     * @protected
     * @param {string} contextId 
     * @param {string} actorId 
     * @param {string} token 
     */
    obrainActor(contextId, actorId, token) {
        return this.contexts.get(contextId).then(contextInfo => {
            return this.contexts.resolve(contextInfo)
        }).then(context => {
            return context.connect(actorId)
        })
    }

    /**
     * 
     * @protected
     * @param {Actor} actor 
     */
    disposeActor(actor) {
        // TODO: implement this
    }

    /**
     * 
     * @protected
     * @returns {Promise.<any>}
     */
    run() {}

}

export default Connector