import { Adapters } from '../Rivalis'
import ContextOptions from './ContextOptions'
import MessageBroker from '../core/MessageBroker'
import Node from '../node/Node'
import Action from '../struct/Action'
import Event from '../struct/Event'
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
    eventBroker = null

    /**
     * 
     * @param {string} id 
     * @param {Adapters} adapters
     */
    constructor(id, adapters, actionHandlers) {
        this.id = id
        this.eventBroker = new MessageBroker(this.id, 'events', adapters.messaging)
    }

    /**
     * 
     * @returns {Promise.<boolean>}
     */
    initialize() {
        this.eventBroker.initialize()
        return Promise.resolve()
    }

    /**
     * 
     * @param {Node} node 
     * @param {Action} action 
     */
    executeAction(node, action) {
        node.vectorClock.increment()
        let event = new Event(action.type, node.vectorClock.getClock(), node.id, action.data)
        this.eventBroker.publish(event)
    }

    /**
     * 
     * @param {string} id
     * @returns {Node}
     */
    connect(id) {
        return new Node(id, this)
    }

}

export default Context