import StateBroker from './StateBroker'
import EventBroker from './EventBroker'
import ActorStorage from './ActorStorage'
import DataStorage from './DataStorage'
import Adapter from '../interfaces/Adapter'

class Persistence {

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
     * @private
     * @type {string}
     */
    contextId = null

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
     * @param {string} contextId
     * @param {Adapter} adapter 
     */
    constructor(contextId, adapter) {
        this.contextId = contextId
        this.adapter = adapter

        this.events = new EventBroker(this.adapter.getMessageBroker(), this.contextId)
        this.state = new StateBroker(this.adapter.getMessageBroker(), this.contextId)
        this.actors = new ActorStorage(this.adapter.getSharedStorage(), this.contextId)
        this.data = new DataStorage(this.adapter.getSharedStorage(), this.contextId)
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    initialize() {
        return this.events.initialize().then(() => {
            return this.state.initialize()
        })
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    clear() {
        return this.actors.clear().then(() => {
            return this.data.clear()
        })
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        return this.events.dispose().then(() => {
            return this.state.dispose()
        }).then(() => {
            this.events = null
            this.state = null
            this.actors = null
            this.data = null
        })
    }

}

export default Persistence