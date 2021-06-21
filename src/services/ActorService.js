import Context from '../core/Context'
import Actor from '../core/Actor'
import ContextProvider from '../providers/ContextProvider'
import State from '../models/State'
import ActorObject from '../models/ActorObject'

class ActorService {

    /**
     * 
     * @private
     * @type {Map.<Actor>}
     */
    actors = null

    /**
     * 
     * @private
     * @type {ContextProvider}
     */
     provider = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {ContextProvider} provider 
     */
    constructor(provider) {
        this.provider = provider
        this.actors = new Map()
        this.provider.state.subscribe(this.handleState, this)
    }

    /**
     * 
     * @param {string} id 
     * @returns {Promise.<ActorObject|null>}
     */
    get(id) {
        return this.provider.actors.get(id)
    }

    /**
     * 
     * @returns {Promise.<Map.<string,ActorObject>>}
     */
    getAll() {
        return this.provider.actors.getAll()
    }

    /**
     * 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     * @returns {Promise.<Actor>}
     */
    join(id, data) {
        return this.provider.actors.savenx(id, { id, data }).then(persisted => {
            if (!persisted) {
                throw new Error(`actor=(${id}) already exist in this context`)
            }
            let actor = new Actor(id, data, this.provider.context)
            this.actors.set(id, actor)
            this.provider.state.emit({ key: Context.State.ACTOR_JOIN, data: { id } })
            return actor
        })
    }

    /**
     * 
     * @param {Actor} actor 
     * @returns {Promise.<any>}
     */
    leave(actor) {
        if (!this.actors.has(actor.id)) {
            return Promise.reject(new Error(`actor id=(${actor.id}) doesn't exist in this context instance`))
        }
        Actor.dispose(this.actors.get(actor.id))
        this.actors.delete(actor.id)
        return this.provider.state.emit({ key: Context.State.ACTOR_LEAVE, data: { id: actor.id } })
    }

    /**
     * 
     * @param {string} id 
     * @param {string} reason 
     * @returns {Promise.<boolean>}
     */
    kick(id, reason) {
        return this.get(id).then(actorObject => {
            if (actorObject === null) {
                return false
            }
            return this.provider.state.emit({ key: Context.State.ACTOR_KICK, data: { id, reason } }).then(() => {
                return true
            })
        })
    }

    /**
     * 
     * @private
     * @param {State} state 
     */
    handleState(state) {
        const { key, data } = state
        if (key === Context.State.ACTOR_KICK) {
            const { id = null } = data
            if (this.actors.has(id)) {
                this.leave(id)
            }
        }
    }

    dispose() {
        this.actors.forEach(actor => Actor.dispose(actor))
        this.provider.state.unsubscribe(this.handleState, this)
        this.actors.clear()
        this.actors = null
    }

}

/**
 * 
 * @param {ActorService} actorService 
 */
ActorService.dispose = (actorService) => {
    actorService.dispose()
}

export default ActorService