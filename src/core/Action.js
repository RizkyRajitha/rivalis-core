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
    data = null

    /**
     * 
     * @param {Action} action 
     */
    constructor(action = {}) {
        this.key = action.key
        this.data = action.data
    }

}

export default Action