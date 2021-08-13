class Action {

    key = null

    data = null

    /**
     * 
     * @param {Action} data 
     */
    constructor(data = {}) {
        this.key = data.key
        this.data = data.data
    }

}

export default Action