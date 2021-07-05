import Rivalis from '../core/Rivalis'
import Protocol from '../interfaces/Protocol'

class ProtocolService {

    /**
     * @private
     * @type {Array.<Protocol>}
     */
    cache = null

    /**
     * @private
     * @type {Rivalis}
     */
    rivalis = null

    constructor(rivalis) {
        this.rivalis = rivalis
        this.cache = []
    }

    /**
     * 
     * @param {Protocol} protocol 
     * @returns {Promise.<void>}
     */
    register(protocol) {
        Protocol.handle(protocol, this.rivalis)
        this.cache.push(protocol)
    }

}

/**
 * 
 * @param {ProtocolService} protocolService 
 */
ProtocolService.disposeAll = protocolService => {
    let promises = []
    for (let protocol of protocolService.cache) {
        promises.push(Protocol.dispose(protocol))
    }
    return Promise.all(promises).then(() => undefined)
}

export default ProtocolService