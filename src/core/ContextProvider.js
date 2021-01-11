import { v4 as uuid } from 'uuid'
import Context from '../Context'
import { Adapters } from '../Options'
import Storage from './Storage'
import ContextInfo from '../structs/ContextInfo'
import ActionManager from './ActionManager'

class ContextProvider {

    /**
     * @private
     * @type {Storage}
     */
    storage = null

    /**
     * 
     * @private
     * @type {Array.<Context>}
     */
    contextLinks = []

    /**
     * 
     * @private
     * @type {Adapters}
     */
    adapters = null

    /**
     * 
     * @private
     * @readonly
     * @type {ActionManager}
     */
    actionManager = null

    /**
     * 
     * @param {Adapters} adapters 
     */
    constructor(adapters, actionManager) {
        this.adapters = adapters
        this.actionManager = actionManager
        this.storage = new Storage('contexts', adapters.storage)
    }

    /**
     * 
     * @param {object} settings 
     * @returns {Promise.<ContextInfo>}
     */
    create(data = {}) {
        const id = uuid()
        const contextInfo = new ContextInfo({ id, data })
        return this.storage.save(id, contextInfo).then(() => contextInfo)
    }

    /**
     * 
     * @param {string} id
     * @returns {Promise.<any>} 
     */
    delete(id) {
        return this.storage.delete(id)
    }

    /**
     * 
     * @param {string} id 
     * @returns {Promise.<ContextInfo>}
     */
    get(id) {
        return this.storage.get(id).then(data => new ContextInfo(data))
    }

    /**
     * 
     * @returns {Promise.<Array.<ContextInfo>>}
     */
    getAll() {
        return this.storage.getAll().then(data => {
            const list = []
            for (let id in data) {
                list.push(new ContextInfo(data[id]))
            }
            return list
        })
    }

    /**
     * 
     * @param {string} id
     * @returns {Promise.<Context>} 
     */
    link(id) {
        let context = this.getContextLinkIfExist(id)
        if (context !== null) {
            return Promise.resolve(context)
        }
        return this.storage.exist(id).then(exist => {
            if (!exist) {
                throw new Error(`context with id (${id}) doesn't exist`)
            }
            return this.get(id)
        }).then(contextInfo => {
            context = new Context(contextInfo, this.adapters, this.actionManager)
            return context.initalize()
        }).then(() => {
            this.addContextLink(context)
            return context
        })
    }

    /**
     * 
     * @param {string} id
     * @returns {Promise.<any>} 
     */
    unlink(id) {
        const context = this.getContextLinkIfExist(id)
        if (context === null) {
            return Promise.reject(new Error(`context with id (${id}) is not linked!`))
        }
        return context.dispose().then(() => {
            return this.removeContextLink(id)
        })
    }

    /**
     * 
     * @returns {Array.<Context>}
     */
    getLinks() {
        return this.contextLinks
    }

    /**
     * 
     * @private
     * @param {string} id
     * @returns {Context|null} 
     */
    getContextLinkIfExist(id) {
        for (let context of this.contextLinks) {
            if (context.id === id) {
                return context
            }
        }
        return null
    }

    /**
     * 
     * @private
     * @param {Context} context
     */
    addContextLink(context) {
        this.contextLinks.push(context)
    }


    /**
     * 
     * @private
     * @param {string} id 
     */
    removeContextLink(id) {
        throw new Error('NOT IMPLEMENTED!')
    }
}

export default ContextProvider