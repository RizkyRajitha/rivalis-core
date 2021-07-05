import Context from '../core/Context'
import Actor from '../core/Actor'
import ContextSync from '../persistence/ContextSync'
import Exception from '../core/Exception'
import Stage from '../core/Stage'

class ActorService {

    /**
     * 
     * @private
     * @type {Map.<string,Actor>}
     */
    actors = null

    /**
     * 
     * @private
     * @type {ContextSync}
     */
    sync = null

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * @private
     * @type {Stage}
     */
    stage = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {Context} context 
     * @param {ContextSync} sync
     * @param {Stage} stage
     */
    constructor(context, sync, stage) {
        this.context = context
        this.sync = sync
        this.stage = stage
        this.actors = new Map()
        this.sync.state.subscribe(this.handleState, this)
    }

    /**
     * 
     * @param {string} id 
     * @returns {Promise.<Object.<string,any>|null>}
     */
    get(id) {
        return this.sync.actors.get(id)
    }

    /**
     * 
     * @returns {Promise.<Map.<string,Object.<string,any>>>}
     */
    getAll() {
        return this.sync.actors.getAll()
    }

    /**
     * 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     * @returns {Promise.<Actor>}
     */
    join(id, data) {
        return Promise.resolve().then(() => {
            return this.stage.onJoin(this.context, id, data)
        }).then(() => {
            return this.sync.actors.savenx(id, { id, data })
        }).then(persisted => {
            if (!persisted) {
                throw new Exception(`actor=(${id}) already exist in this context`, Exception.Code.ACTOR_ALREADY_EXIST)
            }
            let actor = new Actor(id, data, this.context)
            this.actors.set(id, actor)
            this.sync.state.emit({ key: Context.State.ACTOR_JOIN, data: { id } })
            return actor
        })
    }

    /**
     * 
     * @param {Actor} actor 
     * @returns {Promise.<void>}
     */
    leave(actor) {
        if (!this.actors.has(actor.id)) {
            return Promise.reject(new Exception(`actor id=(${actor.id}) doesn't exist in this context instance`, Exception.Code.ACTOR_NOT_EXIST))
        }
        Actor.dispose(this.actors.get(actor.id))
        this.actors.delete(actor.id)
        
        return this.sync.state.emit({ key: Context.State.ACTOR_LEAVE, data: { id: actor.id } }).then(() => {
            return this.stage.onLeave(this.context, actor.id, actor.data)
        }).then(() => {
            return this.sync.actors.delete(actor.id)
        })
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
            return this.sync.state.emit({ key: Context.State.ACTOR_KICK, data: { id, reason } }).then(() => {
                return true
            })
        })
    }

    /**
     * 
     * @returns {Array.<Actor>}
     */
    getActorList() {
        let list = []
        this.actors.forEach(actor => list.push(actor))
        return list
    }

    /**
     * 
     * @private
     * @param {Object.<string,any>} state 
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

    /**
     * @private
     */
    dispose() {
        let promises = []
        this.actors.forEach(actor => promises.push(this.leave(actor)))
        return Promise.all(promises).then(() => {
            this.sync.state.unsubscribe(this.handleState, this)
            this.actors = null
        })
    }

}

/**
 * 
 * @param {ActorService} actorService 
 */
ActorService.dispose = (actorService) => {
    return actorService.dispose()
}

export default ActorService