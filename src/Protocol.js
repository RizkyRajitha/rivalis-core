import { v4 as uuid } from 'uuid'
import ContextProvider from './core/ContextProvider'
import Node from './Node'

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
     * @protected
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
     * @returns {Promise.<any>}
     */
    initalize() {}

}

export default Protocol