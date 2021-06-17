import Actor from '../Actor'
import Engine from '../engine/Engine'
import Context from '../Context'

class ActorModule {

    actors = null

    constructor(engine) {
        // this.engine = engine
        // this.actors = new Map()
        // this.engine.contextEventBroker.subscribe(event => {
        //     this.handleEvent(event.key, event.data)
        // })
    }

    get(id) {
        return this.engine.actorStorage.get(id)
    }

    getAll() {
        return this.engine.actorStorage.getAll()
    }

    join(id, data) {
        return this.engine.actorStorage.savenx(id, { id, data }).then(persisted => {
            if (!persisted) {
                throw new Error(`actor with id ${id} already exist in this context`)
            }
            let actor = new Actor(id, data, this.engine)
            this.actors.set(id, actor)
            this.engine.contextEventBroker.emit({ key: Context.Events.ACTOR_JOIN, data: { id } })
            return actor
        })
    }

    leave(id) {
        if (!this.actors.has(id)) {
            return Promise.reject(new Error(`actor id=(${id}) doesn't exist`))
        }
        let actor = this.actors.get(id)
        actor.dispose()
        this.actors.delete(id)
        return this.engine.contextEventBroker.emit({ key: Context.Events.ACTOR_LEAVE, data: { id } })
    }

    kick(id, reason) {
        return this.get(id).then(actorObject => {
            if (actorObject === null) {
                throw new Error(`there is no actor with id=(${id})`)
            }
            return this.engine.contextEventBroker.emit({ key: Context.Events.ACTOR_KICK, data: { id, reason } })
        })
    }

    handleEvent(key, data) {
        
        if (key === Context.Events.ACTOR_KICK) {
            const {id } = data
            this.handleKickEvent(id)
        }
    }

    handleKickEvent(id) {
        if (!this.actors.has(id)) {
            return
        }
        this.leave(id)
    }

}

export default ActorModule