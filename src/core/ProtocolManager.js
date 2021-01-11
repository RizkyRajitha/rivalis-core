import Protocol from '../Protocol'
import Rivalis from '../Rivalis'
import ContextProvider from './ContextProvider'

class ProtocolManager {

    /**
     * @private
     * @type {Array.<Protocol>}
     */
    protocols = []

    /**
     * @private
     * @type {boolean}
     */
    initalized = false

    /**
     * 
     * @private
     * @type {ContextProvider}
     */
    contexts = null


    /**
     * 
     * @param {Rivalis} rivalis 
     */
    constructor(rivalis) {
        this.rivalis = rivalis
    }

    /**
     * 
     * @param {Protocol} protocol 
     */
    add(protocol) {
        if (!(protocol instanceof Protocol)) {
            throw new Error('the protocol must be an instance of Protocol class')
        }
        if (this.initalized) {
            throw new Error('protocols can not be added after initalization')
        }
        protocol.contexts = this.contexts
        this.protocols.push(protocol)
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    initialize() {
        if (!this.initalized) {
            const promises = []
            for (let protocol of this.protocols) {
                promises.push(protocol.initalize())
            }
            return Promise.all(promises)
        }
        return Promise.reject(new Error('protocols are already initalized!'))
    }

}

export default ProtocolManager