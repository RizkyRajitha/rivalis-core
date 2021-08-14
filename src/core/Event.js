class Event {

    /**
     * @readonly
     * @type {string}
     */
    key = null

    /**
     * @readonly
     * @type {any}
     */
    data = null

    /**
     * @readonly
     * @type {string}
     */
    sender = null

    /**
     * 
     * @param {Event} event 
     */
    constructor(event = {}) {
        this.key = event.key
        this.data = event.data
        this.sender = event.sender
    }

}

export default Event