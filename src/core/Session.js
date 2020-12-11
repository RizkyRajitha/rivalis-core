import { Signal } from 'signals'
import { threadId } from 'worker_threads'
import AdapterHolder from '../adapters/AdapterHolder'
import MessageBroker from '../core/MessageBroker'
import Action from '../models/Action'
import Event from '../models/Event'

class Session {

    id = null

    players = []

    groups = []

    options = []

    /**
     * @private
     * @type {AdapterHolder}
     */
    adapterHolder = null

    /**
     * @private
     * @type {Signal<Event>}
     */
    signal = new Signal()
    add = (listener) => this.signal.add(listener)
    addOnce = (listener) => this.signal.addOnce(listener)

    /**
     * @private
     * @type {MessageBroker}
     */
    messageBroker = null

    /**
     * 
     * @param {Object} data 
     * @param {AdapterHolder} adapterHolder 
     */
    constructor(data, playerId, adapterHolder) {
        const { id, players, groups, options } = data
        this.id = id
        this.players = players
        this.groups = groups
        this.options = options
        this.adapterHolder = adapterHolder
        this.messageBroker = new MessageBroker(id, playerId, adapterHolder.messagingAdapter)
        this.messageBroker.initialize()
        this.messageBroker.add(event => this.signal.dispatch(event))
        
    }

    /**
     * 
     * @param {Action} action 
     */
    execute(action) {
        if (action.type === 'message') {
            const { to, message } = action.data
            this.messageBroker.emit(new Event('message', message))
        }
    }

}

export default Session