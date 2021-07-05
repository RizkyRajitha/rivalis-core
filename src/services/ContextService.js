import Context from '../core/Context'
import Exception from '../core/Exception'
import Rivalis from '../core/Rivalis'
import NodeSync from '../persistence/NodeSync'
import StageService from './StageService'

class ContextService {

    /**
     * @private
     * @type {Map.<string,Context>}
     */
    cache = null

    /**
     * @private
     * @type {Rivalis}
     */
    rivalis = null

    /**
     * @private
     * @type {NodeSync}
     */
    sync = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 1.0.0
     * 
     * // TODO: write description
     * 
     * @param {Rivalis} rivalis 
     * @param {NodeSync} sync 
     */
    constructor(rivalis, sync) {
        this.rivalis = rivalis
        this.sync = sync
        this.sync.events.subscribe(this.handleEvent, this)
        this.cache = new Map()
    }

    /**
     * 
     * @param {string} contextId 
     * @param {string} type 
     * @returns {Promise.<void>}
     */
    create(contextId, type) {
        if (!this.rivalis.stages.exist(type)) {
            return Promise.reject(new Exception(`stage type=(${type}) is not defined`))
        }
        return this.sync.contexts.savenx(contextId, { id: contextId, type }).then(persisted => {
            if (!persisted) {
                throw new Exception(`context id=(${contextId}) already exist!`)
            }
            this.rivalis.logger.trace(`context created id=(${contextId}) type=(${type})`)
        })
    }

    /**
     * 
     * @param {string} contextId 
     * @returns {Promise.<void>}
     */
    destroy(contextId) {
        return this.sync.contexts.get(contextId).then(context => {
            if (context) {
                return this.sync.events.emit({ key: 'context-destroy', data: contextId })
            }
            throw new Exception(`context id=(${contextId}) doesn't exist!`)
        }).then(() => {
            return this.sync.contexts.delete(contextId)
        }).then(() => {
            this.rivalis.logger.trace(`context destroyed id=(${contextId})`)
        })
    }

    /**
     * 
     * @param {string} contextId
     * @returns {Promise.<Context>} 
     */
    obtain(contextId) {
        return this.sync.contexts.get(contextId).then(context => {
            if (context === null) {
                throw new Exception(`context id=(${contextId}) doesn't exist!`, Exception.Code.CONTEXT_NOT_EXIST)
            }
            const { id, type } = context
            if (!this.rivalis.stages.exist(type)) {
                throw new Exception(`stage=(${type}) is not available on this node`)
            }
            if (this.cache.has(id)) {
                return null
            }
            let logger = this.rivalis.logging.getLogger(`${type}:${id}`)
            let stage = StageService.getStage(this.rivalis.stages, type)
            let cInstance = new Context(id, this.sync.adapter, logger, stage)
            this.cache.set(id, cInstance)
            this.rivalis.logger.trace(`context id=(${contextId}) obtained`)
            return cInstance.initialize()
        }).then(() => {
            return this.cache.get(contextId)
        })
    }

    /**
     * @private
     * @param {string} key 
     * @param {any} data 
     */
    handleEvent(key, data) {
        if (key === 'context-destroy') {
            let context = this.cache.get(data)
            if (context) {
                Context.getSync(context).clear().then(() => {
                    return context.dispose()
                }).then(() => {
                    this.cache.delete(data)
                })
            }
        }
    }
}

/**
 * 
 * @param {ContextService} contextService 
 * @returns {Promise.<void>}
 */
ContextService.releaseAll = contextService => {
    let promises = []
    contextService.cache.forEach(context => {
        promises.push(context.dispose())
    })
    return Promise.all(promises)
}

export default ContextService