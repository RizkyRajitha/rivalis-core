import { v4 as uuid } from 'uuid'
import StorageAdapter from '../adapters/StorageAdapter'
import Storage from '../core/Storage'
import Entity from '../models/Entity'
import Session from '../core/Session'
import AdapterHolder from '../adapters/AdapterHolder'

class SessionProvider {

    /**
     * @private
     * @type {AdapterHolder}
     */
    adapterHolder = null

    /**
     * @private
     * @type {Storage}
     */
    storage = null

    /**
     * 
     * @param {AdapterHolder} adapterHolder 
     */
    constructor(adapterHolder) {
        this.adapterHolder = adapterHolder
        this.storage = new Storage('_rivalis:rooms', adapterHolder.storageAdapter)
    }

    /**
     * 
     * @param {Array.<Entity>} players 
     * @param {Array.<Entity>} groups 
     * @param {Object} options
     * @returns {Promise<string>} 
     */
    create(players = [], groups = [], options = {}) {
        const id = uuid()
        const data = { id, players, groups, options }
        return this.storage.set(id, data).then(() => {
            return id
        })
    }

    get(id, playerId) {
        return this.storage.get(id).then(data => {
            if (!this.playerHasAccess(playerId, data)) {
                throw new Error(`player ${playerId} don't have access to play in session ${id}`)
            } else {
                return new Session(data, playerId, this.adapterHolder)
            }
        })
    }

    delete() {
        
    }

    /**
     * 
     * @private
     * @param {string} playerId 
     * @param {Object} data 
     */
    playerHasAccess(playerId, data) {
        let valid = false
        const { players } = data
        for (let player of players) {
            if (player.id === playerId) {
                valid = true
                break
            }
        }
        return valid
    }
}

export default SessionProvider