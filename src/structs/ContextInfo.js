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
    settings = {}
    
    /**
     * 
     * @type {number}
     */
    maxSlots = 0

    /**
     * 
     * @type {Array.<string>}
     */
    activeSlots = []


    /**
     * 
     * @param {ContextInfo} contextInfo 
     */
    constructor(contextInfo = {}) {
        const { id, settings, maxSlots, activeSlots } = contextInfo
        this.id = id ? id : null
        this.settings = settings ? settings : this.settings
        this.maxSlots = maxSlots ? maxSlots : this.maxSlots
        this.activeSlots = activeSlots ? activeSlots : this.activeSlots
    }
}

export default ContextInfo