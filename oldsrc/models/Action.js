class Action {

    /**
     * @type {string|Symbol}
     */
    type = null

    /**
     * @type {any}
     */
    data = null

    /**
     * @type {string}
     */
    sender = null

    constructor(type, data) {
        this.type = type
        this.data = data
    }
}

export default Action