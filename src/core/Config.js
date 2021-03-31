import InMemoryAdapter from '../InMemoryAdapter'
import Adapter from './Adapter'
import Protocol from './Protocol'

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
     * @type {Array.<Protocol>}
     */
    protocols = []

    /**
     * 
     * @param {Config} settings 
     */
    constructor(settings = {}) {
        this.cluster = settings.cluster || 'default'
        this.adapter = settings.adapter || new InMemoryAdapter()
        let protocols = settings.protocols || []
        for (let protocol of protocols) {
            this.protocols.push(protocol)
        }
    }

    /**
     * 
     * @private
     */
    initialize() {

        if (!Adapter.isAdapter(this.adapter)) {
            throw new Error('adapter must be an instance of Adapter class')
        }

        if (!Array.isArray(this.protocols)) {
            throw new Error('protocols must be an array of Protocol class instances')
        }

        for (let protocol of this.protocols) {
            if (!Protocol.isProtocol(protocol)) {
                throw new Error('protocols must be an array of Protocol class instances')
            }
        }


        return this.adapter.initialize()
    }

}

export default Config