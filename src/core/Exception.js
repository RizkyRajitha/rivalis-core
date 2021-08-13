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
    constructor(message, code = 'internal') {
        super(message)
        this.code = code
    }

}

export default Exception