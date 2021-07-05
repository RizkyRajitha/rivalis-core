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

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 1.0.0
     * 
     * // TODO: write description
     * 
     * @param {Rivalis} rivalis 
     */
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