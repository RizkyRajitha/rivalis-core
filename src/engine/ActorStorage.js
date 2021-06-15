import SharedStorageAdapter from '../adapters/SharedStorageAdapter'
import SharedStorage from '../utils/SharedStorage'

/**
 * @typedef ActorObject
 * @property {string} id
 * @property {Object.<string,any>} data
 */

/**
 * 
 * @extends {SharedStorage<ActorObject>}
 */
class ActorStorage extends SharedStorage {
    
    /**
     * 
     * @param {SharedStorageAdapter} adapter 
     * @param {string} contextId 
     */
    constructor(adapter, contextId) {
        super(adapter, `${contextId}-actors`)
    }
}

export default ActorStorage