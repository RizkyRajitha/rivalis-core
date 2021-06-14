import SharedStorage from '../utils/SharedStorage'

/**
 * 
 * @extends {SharedStorage<any>}
 */
class ContextStorage extends SharedStorage {
    constructor(adapter, contextId) {
        super(adapter, `${contextId}-storage`)
    }
}

export default ContextStorage