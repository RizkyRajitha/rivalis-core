import Actor from '../core/Actor'
import Engine from '../engine/Engine'
import Context from '../core/Context'

const { ACTOR_JOIN, ACTOR_KICK, ACTOR_LEAVE } = Context.Events

class ActorManager {

    /**
     * 
     * @private
     * @type {Map.<string,Actor>}
     */
    actors = null

    /**
     * 
     * @private
     * @type {Engine}
     */
    engine = null

    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine) {
        this.engine = engine
        this.actors = new Map()
        this.engine.contextEventBroker.subscribe(event => {
            this.handleEvent(event.key, event.data)
        })
    }

    /**
     * 
     * @param {string} id 
     */
    get(id) {
        return this.engine.actorStorage.get(id)
    }

    /**
     * 
     */
    getAll() {
        return this.engine.actorStorage.getAll()
    }

    /**
     * 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     * @returns {Promise.<Actor>}
     */
    join(id, data) {
        return this.engine.actorStorage.savenx(id, { id, data }).then(persisted => {
            if (!persisted) {
                throw new Error(`actor with id ${id} already exist in this context`)
            }
            let actor = new Actor(id, data, this.engine)
            this.actors.set(id, actor)
            this.engine.contextEventBroker.emit({ key: ACTOR_JOIN, data: { id } })
            return actor
        })
    }

    /**
     * 
     * @param {string} id
     * @returns {Promise.<any>}
     */
    leave(id) {
        if (!this.actors.has(id)) {
            return Promise.reject(new Error(`actor id=(${id}) doesn't exist`))
        }
        let actor = this.actors.get(id)
        actor.dispose()
        this.actors.delete(id)
        return this.engine.contextEventBroker.emit({ key: ACTOR_LEAVE, data: { id } })
    }

    /**
     * 
     * @param {string} id 
     * @param {string} reason
     * @returns {Promise.<any>}
     */
    kick(id, reason) {
        return this.get(id).then(actorObject => {
            if (actorObject === null) {
                throw new Error(`there is no actor with id=(${id})`)
            }
            return this.engine.contextEventBroker.emit({ key: ACTOR_KICK, data: { id, reason } })
        })
    }

    /**
     * 
     * @private
     * @param {string} key 
     * @param {any} data 
     */
    handleEvent(key, data) {
        
        if (key === ACTOR_KICK) {
            const {id } = data
            this.handleKickEvent(id)
        }
    }

    /**
     * 
     * @private
     * @param {string} id
     */
    handleKickEvent(id) {
        if (!this.actors.has(id)) {
            return
        }
        this.leave(id)
    }

}

export default ActorManager