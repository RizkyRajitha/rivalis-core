class Response {

    /**
     * 
     * @type {string}
     */
    type = null

    /**
     * 
     * @type {Object.<string, any>}
     */
    data = null

    /**
     * 
     * @param {Response} response 
     */
    constructor(response = {}) {
        const { type, data } = response
        this.type = type
        this.data = data
    }

}

/**
 * 
 * @enum {string}
 */
Response.Type = {
    
    /**
     * 
     * @readonly
     * @type {string}
     */
    REPLY: 'reply',

    /**
     * 
     * @readonly
     * @type {string}
     */
    EMIT: 'emit'
}

export default Response