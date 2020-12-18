import EventEmitter from 'eventemitter3'
import Action from '../models/Action'

class Agent extends EventEmitter {

    /**
     * unique agent identifier
     * @type {string}
     */
    id = null

    /** @protected */
    emit = super.emit

    /**
     * 
     * @param {string} id unique identifier
     */
    constructor(id) {
        super()
        this.id = id
        if (typeof id !== 'string') {
            throw new Error('Agent must have unique identifier')
        }
    }

    
    /**
     * Used for dispatching actions
     * Needs to be overwritten (current implementation is empty)
     * @param {Action} action 
     */
    dispatch(action) {}

}

export default Agent