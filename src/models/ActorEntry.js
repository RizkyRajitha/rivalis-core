class ActorEntry {

    id = null

    data = null

    ownedBy = null

    /**
     * 
     * @param {ActorEntry} data 
     */
    constructor(data = {}) {
        this.id = data.id
        this.data = data.data
        this.ownedBy = data.ownedBy
    }

}

export default ActorEntry