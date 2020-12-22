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

    constructor(type, data) {
        this.type = type
        this.data = data
    }
}

export default Action