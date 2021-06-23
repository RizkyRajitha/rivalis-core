import SharedStorageAdapter from '../interfaces/SharedStorageAdapter'
import SharedStorage from '../structs/SharedStorage'

class ContextStorage extends SharedStorage {

    /**
     * 
     * @param {SharedStorageAdapter} adapter 
     */
    constructor(adapter) {
        super(adapter, 'contexts')
    }

}

export default ContextStorage