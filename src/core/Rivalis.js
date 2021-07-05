import Adapter from '../interfaces/Adapter'
import NodeSync from '../persistence/NodeSync'
import ContextService from '../services/ContextService'
import ProtocolService from '../services/ProtocolService'
import StageService from '../services/StageService'
import LoggingFactory from '../structs/LoggingFactory'
import AuthResolver from './AuthResolver'
import Logger from './Logger'

class Rivalis {

    /**
     * @type {LoggingFactory}
     */
    logging = null

    /**
     * @type {ContextService}
     */
    contexts = null

    /**
     * @type {ProtocolService}
     */
    protocols = null

    /**
     * @type {StageService}
     */
    stages = null

    /**
     * @private
     * @type {Adapter}
     */
    adapter = null

    /**
     * @private
     * @type {AuthResolver}
     */
    authResolver = null

    /**
     * @private
     * @type {NodeSync}
     */
    sync = null

    /**
     * @private
     * @type {Logger}
     */
    logger = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 1.0.0
     * 
     * // TODO: write description
     * 
     * @param {Adapter} adapter 
     * @param {AuthResolver} authResolver
     */
    constructor(adapter, authResolver = null) {
        this.adapter = adapter
        this.authResolver = authResolver === null ? new AuthResolver() : authResolver
        this.logging = new LoggingFactory()
        this.logger = this.logging.getLogger('rivalis')
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    initialize() {
        return this.adapter.initialize().then(() => {
            this.sync = new NodeSync(this.adapter)
            return this.sync.initialize()
        }).then(() => {
            this.contexts = new ContextService(this, this.sync)
            this.protocols = new ProtocolService(this)
            this.stages = new StageService()
            this.logger.info('node is started successfully')
        })
    }

    /**
     * 
     * @returns {Promise.<void>}
     */
    dispose() {
        StageService.removeAll(this.stages)
        return ProtocolService.disposeAll(this.protocols).then(() => {
            return ContextService.releaseAll(this.contexts)
        }).then(() => {
            this.stages = null
            this.protocols = null
            this.contexts = null
            return this.sync.dispose()
        }).then(() => {
            this.sync = null
            return this.adapter.dispose()
        }).then(() => {
            this.logger.info('node is disposed')
        })   
    }
}

/**
 * 
 * @param {Rivalis} rivalis 
 * @returns {AuthResolver}
 */
Rivalis.getAuthResolver = rivalis => {
    return rivalis.authResolver
}

export default Rivalis

