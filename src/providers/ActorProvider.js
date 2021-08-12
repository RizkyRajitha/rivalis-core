import Actor from '../core/Actor'
import Config from '../core/Config'
import Context from '../core/Context'
import Exception from '../core/Exception'
import ActorEntry from '../models/ActorEntry'
import SharedStorage from '../persistence/SharedStorage'
import SystemBroadcast from '../persistence/SystemBroadcast'

class ActorProvider extends SystemBroadcast {
    
    /**
     * @private
     * @type {Map.<string,Actor>}
     */
    actors = null

    /**
     * @private
     * @type {SharedStorage.<ActorEntry>}
     */
    storage = null

    /**
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @param {Config} config 
     * @param {Context} context 
     */
    constructor(config, context, logger) {
        super(config.persistence, context.id, 'actors')
        this.storage = new SharedStorage(config.persistence, `${context.id}:actors`)
        this.actors = new Map()
        this.logger = logger
        this.context = context
        this.on('kick', this.handleKick, this)
    }

    async join(id, data) {
        // TODO: validate id & data
        let actorEntry = new ActorEntry({ id, data })
        let persisted = await this.storage.savenx(id, actorEntry)
        if (!persisted) {
            throw new Exception(`[actors] join failed, actor id=(${id}) already exist!`)
        }
        this.logger.info(`actor id=(${id}) data=(${JSON.stringify(data)}) has just joined the room!`)
        let actor = new Actor(id, data, this.context)
        this.actors.set(id, actor)
        return actor
    }

    /**
     * 
     * @param {Actor} actor 
     */
    async leave(actor) {
        if (!this.actors.has(actor.id)) {
            return
        }
        await this.storage.delete(actor.id)
        actor = this.actors.get(actor.id)
        actor.emit.leave()
        Actor.dispose(actor)
        this.actors.delete(actor.id)
        this.logger.info(`actor id=(${actor.id}) has left the room!`)
    }

    async kick(id) {
        let exist = await this.storage.exist(id)
        if (!exist) {
            throw new Exception(`[actors] kick failed, actor id=(${id}) doesn't exist!`)
        }
        this.broadcast('kick', id)
    }

    /**
     * 
     * @returns {Promise.<Array.<ActorEntry>>}
     */
    async getAll() {
        let list = []
        let actors = await this.storage.getAll()
        actors.forEach(actor => list.push(actor))
        return list
    }

    get(id) {
        return this.storage.get(id)
    }

    /**
     * @returns {Array.<Actor>}
     */
    get list() {
        let list = []
        this.actors.forEach(actor => list.push(actor))
        return list
    }

    /**
     * @private
     * @param {string} id
     */
    handleKick(id) {
        if (!this.actors.has(id)) {
            return
        }
        this.leave(this.actors.get(id))
    }
}

export default ActorProvider