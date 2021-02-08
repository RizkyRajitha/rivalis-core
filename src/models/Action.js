class Action {

    /**
     * 
     * @type {string}
     */
    type = null

    /**
     * 
     * @type {Object.<string, any>}
     */
    data = null

    /**
     * 
     * @param {Action} action 
     */
    constructor(action = {}) {
        const { type, data } = action
        this.type = typeof type === 'string' ? type : this.type
        this.data = typeof data !== 'undefined' ? data : this.data

        if (typeof this.type !== 'string') {
            throw new Error('hehe action 1 NOT IMPLEMENTED!')
        }

        if (typeof this.data === 'undefined') {
            throw new Error(' hehe action 2 NOT IMPLEMENTED!')
        }
    }
}

export default Action