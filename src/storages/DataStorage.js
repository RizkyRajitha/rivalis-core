import Adapter from '../interfaces/Adapter'
import SharedStorage from '../structs/SharedStorage'

/**
 * 
 * @extends {SharedStorage<any>}
 */
class DataStorage extends SharedStorage {
    
    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {Adapter} adapter 
     * @param {string} contextId 
     */
    constructor(adapter, contextId) {
        super(adapter, `${contextId}-storage`)
    }
}

export default DataStorage