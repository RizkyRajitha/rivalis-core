import Config from '../Config'
import ContextProvider from './ContextProvider'
import Slot from '../structs/Slot'
import { v4 as uuid } from 'uuid'

class SlotProvider {

    /**
     * 
     * @private
     * @type {Config}
     */
    config = null

    /**
     * 
     * @private
     * @type {ContextProvider}
     */
    contextProvider = null

    /**
     * 
     * @param {Config} config 
     * @param {ContextProvider} contextProvider 
     */
    constructor(config, contextProvider) {
        this.config = config
        this.contextProvider = contextProvider
    }

    /**
     * 
     * @param {string} contextId 
     * @param {string} actorId 
     * @returns {Slot}
     */
    obtain(contextId, actorId) {
        let maxSlots = null
        return this.contextProvider.get(contextId).then(context => {
            if (context === null) {
                throw new Error(`context [${contextId}] doesn't exist`)
            }
            maxSlots = context.maxSlots
            return this.getAll(contextId)
        }).then(slots => {
            if (maxSlots <= slots && maxSlots !== 0) {
                throw new Error('max slot size exceeded')
            }
            for (let slot of slots) {
                if (slot.actorId === actorId) {
                    throw new Error(`actor [${actorId}] slot is already taken`)
                }
            }
            const token = uuid()
            return this.config.adapters.kvStorage.save(this.getNamespace(contextId), actorId, token).then(() => {
                return new Slot({ actorId, token })
            })
        })
    }

    retain(contextId, actorId, token) {
        // TODO: implement this
    }

    /**
     * 
     * @param {string} contextId
     * @returns {Promise.<Array.<Slot>>} 
     */
    getAll(contextId) {
        return this.config.adapters.kvStorage.getAll(this.getNamespace(contextId)).then(slots => {
            const list = []
            for (let key in slots) {
                list.push(new Slot({
                    actorId: key,
                    token: slots[key]
                }))
            }
            return list
        })
    }

    get(contextId, actorId) {

    }

    /**
     * 
     * @private
     * @param {string} contextId 
     */
    getNamespace = (contextId) => `slots-${contextId}`

}

export default SlotProvider