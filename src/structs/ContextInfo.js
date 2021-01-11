class ContextInfo {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {object}
     */
    data = {}

    /**
     * 
     * @param {ContextInfo} contextInfo 
     */
    constructor(contextInfo = {}) {
        const { id, data } = contextInfo
        this.id = id ? id : null
        this.data = data ? data : {}
    }

}

export default ContextInfo