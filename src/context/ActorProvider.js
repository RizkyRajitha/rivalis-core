import SharedStorageAdapter from '../adapters/SharedStorageAdapter'
import SharedStorage from '../interfaces/SharedStorage'
import Context from './Context'
import Actor from './Actor'

/**
 * @typedef ActorData
 * @property {string} id
 * @property {Object.<string,any>} data
 */

class ActorProvider {

    /**
     * 
     * @private
     * @type {SharedStorage.<ActorData>}
     */
    storage = null

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @type {Map.<string,Actor>}
     */
    actors = null

    /**
     * 
     * @param {SharedStorageAdapter} sharedStorageAdapter 
     * @param {Context} context 
     */
    constructor(sharedStorageAdapter, context) {
        this.context = context
        this.storage = new SharedStorage(sharedStorageAdapter, context.id + '-actors')
        this.actors = new Map()
    }

    /**
     * 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     * @returns {Promise.<Actor>}
     */
    join(id, data) {
        return this.storage.savenx(id, { id, data }).then(() => {
            let actor = new Actor(id, data, this.context)
            this.actors.set(id, actor)
            return actor
        }).catch(error => {
            throw new Error('failed to join') // TODO: write better error message (logger handling)
        })
    }

    /**
     * 
     * @param {Actor} actor 
     */
    leave(actor) {
        if (!this.actors.has(actor.id)) {
            return Promise.reject(new Error('failed to leave')) // TODO: write better error message (logger handling)
        }
        return this.storage.delete(actor.id).then(() => {
            actor.dispose()
            this.actors.delete(actor.id)
        }).catch(error => {
            throw new Error('failed to leave') // TODO: write better error message (logger handling)
        })
    }

    /**
     * 
     * @param {Object.<string,string>} filter 
     * @returns {Array.<ActorData>}
     */
    getAll() {
        return this.storage.getAll().catch(error => {
            throw new Error('failed to get list of actors') // TODO: write better error message (logger handling)
        })
    }
}

export default ActorProvider