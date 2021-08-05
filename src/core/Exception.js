class Exception extends Error {

    /**
     * @readonly
     * @type {string}
     */
    code = null

    /**
     * 
     * @param {string} [message] 
     * @param {string} [code]
     */
    constructor(message, code = null) {
        super(message)
        this.code = code
    }

}

export default Exception