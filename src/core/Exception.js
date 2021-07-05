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
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * // TODO: write description
     * 
     * @param {string} message 
     * @param {strubg} code 
     */
    constructor(message, code = null) {
        super(message)
        this.code = code === null ? Exception.Code.INTERNAL : code
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
    ACTOR_NOT_EXIST: getCode(5),

    AUTH_FAILED: getCode(6),
    ACCESS_DENIED: getCode(7)
}

/**
 * 
 * @param {string} code 
 * @returns {string}
 */
Exception.getException = code => {
    for (let key in Exception.Code) {
        if (code === Exception.Code[key]) {
            return key
        }
    }
    return null
}

export default Exception