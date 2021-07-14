class Config {

    /**
     * @type {Persistence}
     */
    persistence = null

    /**
     * @type {Array.<Transport>}
     */
    transports = null

    /**
     * @type {Array.<LogReporters>}
     */
    logReporters = null

    authResolver = null

    /**
     * 
     * @param {Config} [config] 
     */
    constructor(config = {}) {
        
    }

}

export default Config