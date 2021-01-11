import ActionManager from './core/ActionManager'
import EventBroker from './core/EventBroker'
import EventStorage from './core/EventStorage'
import Storage from './core/Storage'
import Node from './Node'
import { Adapters } from './Options'
import ContextInfo from './structs/ContextInfo'

class Context {

    /**
     * 
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * 
     * @readonly
     * @type {object}
     */
    data = {}


    /**
     * 
     * @private
     * @readonly
     * @type {ActionManager}
     */
    actionManager = null

    /**
     * 
     * @private
     * @readonly
     * @type {Array.<Node>}
     */
    liveNodes = []

    /**
     * 
     * @private
     * @readonly
     * @type {EventBroker}
     */
    eventBroker = null


    /**
     * 
     * @private
     * @readonly
     * @type {EventStorage}
     */
    eventStorage = null

    /**
     * @private
     * @readonly
     * @type {Storage}
     */
    contextStorage = null

    /**
     * 
     * @param {ContextInfo} contextInfo 
     * @param {Adapters} adapters
     * @param {ActionManager} actionManager
     */
    constructor(contextInfo, adapters, actionManager) {
        this.id = contextInfo.id
        this.data = contextInfo.data
        this.actionManager = actionManager

        this.eventBroker = new EventBroker(this.id, adapters.messaging)
        this.eventStorage = new EventStorage(this.id, adapters.storage)
        this.contextStorage = new Storage(this.id, adapters.storage)
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    initalize() {
        return this.eventBroker.initalize()
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    dispose() {
        return this.eventBroker.dispose()
    }

    /**
     * 
     * @param {string} nodeId
     * @returns {Node} 
     */
    connect(nodeId) {
        let node = this.getNodeIfExist(nodeId)
        if (node !== null) {
            throw new Error(`node ${nodeId} is already connected`)
        }
        node = new Node(nodeId, this)
        this.addNodeToLiveList(node)
        return node
    }

    /**
     * 
     * @param {string} nodeId 
     */
    disconnect(nodeId) {
        throw new Error('NOT IMPLEMENTED!')
    }

    /**
     * 
     * @returns {Array.<Node>}
     */
    getNodes() {
        return this.liveNodes
    }

    /**
     * 
     * @private
     * @param {string} nodeId 
     */
    getNodeIfExist(nodeId) {
        for (let node of this.liveNodes) {
            if (node.id === nodeId) {
                return node
            }
        }
        return null
    }

    /**
     * 
     * @private
     * @param {Node} node 
     */
    addNodeToLiveList(node) {
        this.liveNodes.push(node)
    }
}

export default Context