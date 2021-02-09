import InMemoryAdapter from "../InMemoryAdapter"
import Adapter from "./Adapter"
import Connector from "./Connector"

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

    /**
     * 
     * @type {Array.<Connector>}
     */
    connectors = []

    /**
     * 
     * @param {Config} settings 
     */
    constructor(settings = {}) {
        this.cluster = settings.cluster || 'default'
        this.adapter = settings.adapter || new InMemoryAdapter()
        let connectors = settings.connectors || []
        for (let connector of connectors) {
            this.connectors.push(connector)
        }
    }

    /**
     * 
     * @private
     */
    initialize() {

        if (this.adapter !== null && !(this.adapter instanceof Adapter)) {
            throw new Error('adapter must be an instance of Adapter class')
        }

        if (!Array.isArray(this.connectors)) {
            throw new Error('connectors must be an array of Connector class instances')
        }

        for (let connector of this.connectors) {
            if (!(connector instanceof Connector)) {
                throw new Error('connectors must be an array of Connector class instances')
            }
        }


        return this.adapter.initialize()
    }

}

export default Config