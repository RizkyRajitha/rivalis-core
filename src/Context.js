import EventProvider from './core/EventProvider'
import Actor from './Actor.js'
import Action from './structs/Action'
import Event from './structs/Event'
import ActionHandlerGroup from './core/ActionHandlerGroup'
import Config from './Config'

class Context {

    /**
     * 
     * @type {string}
     */
    id = null


    /**
     * 
     * @type {EventProvider}
     */
    events = null

    /**
     * 
     * @type {ActionHandlerGroup}
     */
    actions = null

    /**
     * 
     * @param {string} id
     * @param {ActionHandlerGroup} actionHandlerGroup 
     * @param {Config} config
     */
    constructor(id, actionHandlerGroup, config) {
        this.id = id
        this.actions = actionHandlerGroup
        this.events = new EventProvider(id, config)
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
     * @returns {Promise.<Actor>} 
     */
    connect(actorId, token) {
        return Promise.resolve(new Actor(actorId, this))
    }

    /**
     * 
     * @param {Actor} actor 
     * @param {Action} action 
     * @returns {Promise.<any>}
     */
    execute(actor, action) {
        const currentTime = new Date().getTime()
        let actionHandler = null
        try {
            actionHandler = ActionHandlerGroup.getHandler(this.actions, action.type)
        } catch (error) {
            return Promise.reject(error)
        }

        return Promise.resolve().then(() => {
            return actionHandler(action, actor.id, this.id)
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