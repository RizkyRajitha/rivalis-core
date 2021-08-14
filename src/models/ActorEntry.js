class ActorEntry {

    /**
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * @readonly
     * @type {Object.<string,any>}
     */
    data = null

    /**
     * 
     * @param {ActorEntry} actorEntry 
     */
    constructor(actorEntry = {}) {
        this.id = actorEntry.id
        this.data = actorEntry.data
    }

}

export default ActorEntry