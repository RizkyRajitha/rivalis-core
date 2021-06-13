import SharedStorageAdapter from '../adapters/SharedStorageAdapter'
import SharedStorage from '../interfaces/SharedStorage'
import Context from './Context'
import Event from './Event'

/**
 * 
 * @extends {SharedStorage<any>}
 */
class Storage extends SharedStorage {

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @param {SharedStorageAdapter} adapter
     * @param {Context} context 
     */
    constructor(adapter, context) {
        super(adapter, context.id)
        this.context = context
    }

}

export default Storage