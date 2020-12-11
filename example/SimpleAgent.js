import { Agent } from '../src'
import Session from '../src/core/Session'

class SimpleAgent extends Agent {

    /** @type {Session} */
    session = null

    /**
     * 
     * @param {string} id 
     * @param {Session} session 
     */
    constructor(id, session) {
        super(id)
        this.session = session
        session.add(event => {
            this.emit('event', event)
        })
    }

    /**
     * Used for dispatching actions
     * Needs to be overwritten (current implementation is empty)
     * @param {Action} action 
     */
    dispatch(action) {
        this.session.execute(action)
    }

} 

export default SimpleAgent