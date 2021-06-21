import StateBroker from '../brokers/StateBroker'
import EventBroker from '../brokers/EventBroker'
import ActorStorage from '../storages/ActorStorage'
import DataStorage from '../storages/DataStorage'
import Context from '../core/Context'
import Adapter from '../interfaces/Adapter'
import VectorClock from '../structs/VectorClock'

class ContextProvider {

    /**
     * 
     * @type {EventBroker}
     */
    events = null

    /**
     * 
     * @type {StateBroker}
     */
    state = null

    /**
     * 
     * @type {ActorStorage}
     */
    actors = null

    /**
     * 
     * @type {DataStorage}
     */
    data = null

    /**
     * 
     * @type {VectorClock}
     */
    clock = null

    /**
     * 
     * @type {Context}
     */
    context = null

    /**
     * 
     * @private
     * @type {Adapter}
     */
    adapter = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {Context} context 
     * @param {Adapter} adapter 
     */
    constructor(context, adapter) {
        this.context = context
        this.adapter = adapter
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    initialize() {
        this.events = new EventBroker(this.adapter.getMessageBroker(), this.context.id)
        this.state = new StateBroker(this.adapter.getMessageBroker(), this.context.id)
        this.actors = new ActorStorage(this.adapter.getSharedStorage(), this.context.id)
        this.data = new DataStorage(this.adapter.getSharedStorage(), this.context.id)

        this.clock = new VectorClock()

        return this.events.initialize().then(() => {
            return this.state.initialize()
        })
    }

    /**
     * 
     * @returns {Promise.<any>}
     */
    dispose() {
        return this.events.dispose().then(() => {
            return this.state.dispose()
        }).then(() => {
            this.events = null
            this.state = null
            this.actors = null
            this.data = null

            this.clock = null
        })
    }

}

export default ContextProvider