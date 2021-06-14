import Actor from '../core/Actor'
import Engine from '../engine/Engine'

class ActionManager {

    /**
     * 
     * @type {Engine}
     */
    engine = null

    constructor(engine) {
        this.engine = engine
    }

    /**
     * 
     * @param {Actor} actor
     * @param {string} key 
     * @param {any} data 
     * @param {number} timestamp
     */
    execute(actor, key, data, timestamp) {
        
    }

}

export default ActionManager