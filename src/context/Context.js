import { Adapters } from '../Rivalis'
import ContextOptions from './ContextOptions'
import MessageBroker from '../core/MessageBroker'
import Node from '../node/Node'
import Action from '../models/Action'
class Context {

    /**
     * 
     * @type {id}
     */
    id = null

    /**
     * @type {ContextOptions}
     */
    options = new ContextOptions()

    /**
     * @type {MessageBroker}
     */
    messageBroker = null

    /**
     * 
     * @param {string} id 
     * @param {Adapters} adapters
     */
    constructor(id, adapters, actionHandlers) {
        this.id = id
        this.messageBroker = new MessageBroker(this.id, 'events', adapters.messaging)
    }

    /**
     * 
     * @returns {Promise.<boolean>}
     */
    initialize() {
        return Promise.resolve()
    }

    /**
     * 
     * @param {Node} node 
     * @param {Action} action 
     */
    executeAction(node, action) {

    }

    /**
     * 
     * @param {string} id
     * @returns {Node}
     */
    connect(id) {

    }

}

export default Context