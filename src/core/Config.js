import Adapter from "../adapters/Adapter"

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
        this.cluster = settings.cluster || 'default'
        this.adapter = settings.adapter || null
        let connectors = settings.connectors || []
        for (let connector of connectors) {
            this.connectors.push(connector)
        }
        this.validate()
    }

    /**
     * 
     * @private
     */
    validate() {
        if (this.adapter === null) {
            throw new Error('Rivalis can not be started without an adapter')
        }
        if (!(this.adapter instanceof Adapter)) {
            throw new Error('adapter must be an instance of Adapter class')
        }
        // TODO: implement validation for connectors
    }

}

export default Config