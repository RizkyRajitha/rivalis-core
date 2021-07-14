import Broadcaster from '../structs/Broadcaster'
import generateID from '../utils/generateID'

class System extends Broadcaster {

    /**
     * @private
     * @type {string}
     */
    id = null

    constructor() {
        this.id = generateID()
    }

    /**
     * @private
     * @returns {Promise.<void>}
     */
    init() {
        return Promise.reject(new Exception('System#init is not implemented'))
    }

    /**
     * @private
     * @returns {Promise.<void>}
     */
    dispose() {
        return Promise.reject(new Exception('System#dispose is not implemented'))
    }

}

/**
 * 
 * @param {System} system 
 */
System.getID = system => {
    return system.id || null
}

export default System