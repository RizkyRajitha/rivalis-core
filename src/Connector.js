import { v4 as uuid } from 'uuid'
import Actor from './Actor'
import ContextProvider from './core/ContextProvider'
import Rivalis from './Rivalis'

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
     * @type {Rivalis}
     */
    rivalis = null

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
    initalize(rivalis) {
        this.rivalis = rivalis
        return this.run()
    }

    /**
     * 
     * @protected
     * @param {string} contextId 
     * @param {string} actorId 
     * @param {string} token 
     * @returns {Promise.<Actor>}
     */
    obtainActor(contextId, actorId, token) {
        return this.rivalis.pool.get(contextId).then(context => {
            return context.connect(actorId, token)
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