import ContextInfo from './structs/ContextInfo'
import EventProvider from './providers/EventProvider'
import Rivalis from './Rivalis'
import Actor from './Actor.js'
import Action from './structs/Action'
import ActionHandlerRepository from './core/ActionHandlerRepository'
import Event from './structs/Event'

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
     * @type {ActionHandlerRepository}
     */
    actions = null
    

    /**
     * 
     * @param {ContextInfo} contextInfo 
     * @param {Rivalis} rivalis 
     */
    constructor(contextInfo, rivalis) {
        this.info = contextInfo
        this.actions = rivalis.actions
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

    /**
     * 
     * @param {string} actorId
     * @returns {Actor} 
     */
    connect(actorId) {
        //TODO: check if someone is connected with same id, connect
        return new Actor(actorId, this)
    }

    /**
     * 
     * @param {Actor} actor 
     * @param {Action} action 
     * @returns {Promise.<any>}
     */
    execute(actor, action) {
        const currentTime = new Date().getTime()
        const actionExecutable = this.actions.get(action.type)
        if (actionExecutable === null) {
            return Promise.reject(new Error('NOT IMPLEMENTED! action doesnt exist'))
        }
        return Promise.resolve().then(() => {
            return actionExecutable(action, this.info, actor)
        }).then(result => {
            if (result === null || result === undefined) {
                return
            }
            actor.clock.increment()
            const event = new Event({
                type: action.type,
                data: result,
                senderId: actor.id,
                clock: actor.clock.getClock(),
                time: [action.time, currentTime]
            })
            return this.events.emit(event)
        })
    }
    
}

export default Context