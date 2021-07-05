import SharedStorageAdapter from '../interfaces/SharedStorageAdapter'
import SharedStorage from '../structs/SharedStorage'

class ContextStorage extends SharedStorage {

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {SharedStorageAdapter} adapter 
     */
    constructor(adapter) {
        super(adapter, 'contexts')
    }

}

export default ContextStorage