import SharedStorageAdapter from '../interfaces/SharedStorageAdapter'
import SharedStorage from '../structs/SharedStorage'
import ActorObject from '../models/ActorObject'
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