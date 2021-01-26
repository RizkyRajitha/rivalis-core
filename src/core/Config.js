import Adapter from "../adapter/Adapter"

class Config {

    /**
     * 
     * @type {string}
     */
    cluster = 'default'

    /**
     * 
     * @type {Adapter}
     */
    adapter = null

    // TODO: implement this
    connectors = []

    /**
     * 
     * @param {Config} settings 
     */
    constructor(settings = {}) {
        this.cluster = settings.cluster
        this.adapter = settings.adapter
        // this.connectors = settings.connectors
        this.validate()
    }

    /**
     * 
     * @private
     */
    validate() {

    }

}

export default Config