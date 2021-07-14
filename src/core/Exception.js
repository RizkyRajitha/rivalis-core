class Exception extends Error {
    
    /**
     * @type {string}
     */
    code = null
    
    /**
     * @param {string} message 
     * @param {strubg} code 
     */
    constructor(message, code = null) {
        super(message)
        this.code = code === null ? 'TODO: IMPL THIS' : code
    }
}

export default Exception