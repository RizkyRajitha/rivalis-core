class Event {

    key = null

    data = null

    sender = null

    /**
     * 
     * @param {Event} data 
     */
    constructor(data = {}) {
        this.key = data.key
        this.data = data.data
        this.sender = data.sender
    }

}

export default Event