class Context {

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
     * @param {Context} context 
     */
    constructor(context = {}) {
        const { id, settings, maxSlots } = context
        this.id = id ? id : null
        this.settings = settings ? settings : this.settings
        this.maxSlots = maxSlots ? maxSlots : this.maxSlots
    }
}

export default Context