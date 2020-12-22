class Event {
    
    /**
     * 
     * @type {string}
     */
    type = null

    /**
     * 
     * @type {object}
     */
    clock = null

    /**
     * 
     * @type {string}
     */
    senderId = null


    /**
     * 
     * @type {any}
     */
    data = null

    /**
     * 
     * @param {string} type 
     * @param {object} clock 
     * @param {string} senderId
     * @param {any} data 
     */
    constructor(type = null, clock = {}, senderId = null, data = {}) {
        this.set({ type, clock, senderId, data })
    }

    set(object = {}) {
        const { type, clock, senderId, data } = object
        this.type = type
        this.clock = clock
        this.senderId = senderId
        this.data = data
    }
}

export default Event