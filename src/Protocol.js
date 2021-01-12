import { v4 as uuid } from 'uuid'
import ContextRepository from './core/ContextRepository'

class Protocol {

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
     * @type {ContextRepository}
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
     * @param {ContextRepository} contexts 
     */
    initalize(contexts) {
        this.contexts = contexts
        return this.run()
    }

    
    getActor(contextId, actorId) {
        // TODO: implement middleware and integrate data
        return this.contexts.getContext(contextId).then(contextInfo => {
            return this.contexts.resolve(contextInfo)
        }).then(context => {
            return context.connect(actorId)
        })
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    run() {}

}

export default Protocol