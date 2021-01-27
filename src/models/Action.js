class Action {

    /**
     * 
     * @type {string}
     */
    type = null

    /**
     * 
     * @type {any}
     */
    data = null

    /**
     * 
     * @type {number}
     */
    time = null

    /**
     * 
     * @param {Action} action 
     */
    constructor(action = {}) {
        const { type, data, time } = action
        this.type = typeof type === 'string' ? type : this.type
        this.data = typeof data !== 'undefined' ? data : this.data
        this.time = typeof time === 'number' ? time : this.time
    }

    /**
     * 
     */
    validate() {
        if (typeof this.type !== 'string') {
            throw new Error('hehe action 1 NOT IMPLEMENTED!')
        }

        if (typeof this.data === 'undefined') {
            throw new Error(' hehe action 2 NOT IMPLEMENTED!')
        }

        if (typeof this.time !== 'number') {
            throw new Error(' hehe action 3 NOT IMPLEMENTED!')
        }
    }
}

export default Action