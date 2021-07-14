import Events from './Events'
import System from './System'
import Exception from './Exception'
import Broadcaster from '../structs/Broadcaster'
import Config from './Config'

class Core extends Broadcaster {

    /**
     * @protected
     * @type {Config}
     */
    config = null

    /**
     * @private
     * @type {Map.<string,System>}
     */
    systems = null

    /**
     * 
     * @param {Config} [config] 
     */
    constructor(config = {}) {
        this.config = new Config(config)
        this.systems = new Map()
    }

    /**
     * 
     * @param {System} system
     * @returns {Promise.<string>} 
     */
    addSystem(system) {
        return system.init(this.persistence, this.transport).then(() => {
            let id = System.getID(system)
            if (id === null) {
                throw new Exception('Core#addSystem, system must be an instance of System class')
            }
            this.systems.set(id, system)
            this.events.emit(Events.ENABLE)
            return id
        })
    }

    /**
     * 
     * @param {string} id 
     * @returns {Promise.<void>}
     */
    removeSystem(id) {
        return system.dispose().then(() => {

        })
    }

    /**
     * 
     * @param {string} id 
     * @returns {System}
     */
    getSystem(id) {

    }

}

export default Core