import SharedStorage from '../interfaces/SharedStorage'
import Event from './Event'

/**
 * 
 * @extends {SharedStorage<any>}
 */
class Storage extends SharedStorage {

    /**
     * 
     * @protected
     * @param {Event} message
     * @returns {string} 
     */
    mapInput = message => Event.stringify(message) 

    /**
     * 
     * @protected
     * @param {string} message
     * @returns {Event} 
     */
    mapOutput = message => Event.parse(message)

}

export default Storage