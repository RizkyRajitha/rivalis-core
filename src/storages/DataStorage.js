import SharedStorage from '../structs/SharedStorage'

/**
 * 
 * @extends {SharedStorage<any>}
 */
class DataStorage extends SharedStorage {
    constructor(adapter, contextId) {
        super(adapter, `${contextId}-storage`)
    }
}

export default DataStorage