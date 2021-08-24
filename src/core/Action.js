class Action {

    /**
     * @readonly
     * @type {string}
     */
    key = null

    /**
     * @readonly
     * @type {string}
     */
    payload = null

    /**
     * 
     * @param {Action} action 
     */
    constructor(action = {}) {
        this.key = action.key
        this.payload = action.payload
    }

}

export default Action