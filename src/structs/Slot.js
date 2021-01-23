import { type } from "os"

class Slot {

    /**
     * 
     * @type {string}
     */
    actorId = null

    /**
     * 
     * @type {string}
     */
    token = null

    /**
     * 
     * @param {Slot} slot 
     */
    constructor(slot = {}) {
        const { actorId, token } = slot
        this.actorId = typeof actorId === 'string' ? actorId : this.actorId
        this.token = typeof token === 'string' ? token : this.token
    }

}

export default Slot