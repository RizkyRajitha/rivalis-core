import Config from './Config'
import ContextInfo from './structs/ContextInfo'
import EventProvider from './providers/EventProvider'
import Rivalis from './Rivalis'
import Actor from './Actor'

class Context {

    /**
     * 
     * @type {ContextInfo}
     */
    info = null


    /**
     * 
     * @type {EventProvider}
     */
    events = null

    /**
     * 
     * @param {ContextInfo} contextInfo 
     * @param {Rivalis} rivalis 
     */
    constructor(contextInfo, rivalis) {
        this.info = contextInfo
        this.events = new EventProvider(this.info.id, rivalis.config)
    }

    /**
     * 
     * @protected
     * @returns {Promise.<any>}
     */
    initalize() {
        return this.events.initalize()
    }

    connect(actorId) {

        //TODO: check if someone is connected with same id, connect
        const actor = new Actor(actorId, this)
        return actor
    }
    
}

export default Context