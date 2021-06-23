const getCode = (number) => {
    let hex = Number(number).toString(16)
    hex = `0x${"0".repeat(2 - hex.length)}${hex}`
    return hex  
}

class Exception extends Error {
    
    /**
     * @type {string}
     */
    code = null
    
    /**
     * 
     * @param {string} message 
     * @param {strubg} code 
     */
    constructor(message, code) {
        super(message)
        this.code = code
    }
}

/**
 * @enum {string}
 */
 Exception.Code = {
    INTERNAL: getCode(0),
    
    CONTEXT_NOT_EXIST: getCode(1),

    ACTION_NOT_EXIST: getCode(2),
    ACTION_EXECUTION_FAILED: getCode(3),

    ACTOR_ALREADY_EXIST: getCode(4),
    ACTOR_NOT_EXIST: getCode(5)
    
}
export default Exception