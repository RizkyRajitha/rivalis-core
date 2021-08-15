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

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     */
    rename(key, value) {
        let list = key.split('.')
        list.pop()
        list.push(value)
        return list.join('.')
    }

}

export default Action