import Persistence from '../interfaces/Persistence'
import SharedCounter from '../persistence/SharedCounter'
import SharedList from '../persistence/SharedList'
import SharedStorage from '../persistence/SharedStorage'

class DataProvider {

    /**
     * @private
     * @type {Persistence}
     */
    persistence = null

    /**
     * @private
     * @type {string}
     */
    namespace = null

    /**
     * @private
     * @type {Map.<string,SharedStorage>}
     */
    storages = null

    /**
     * @private
     * @type {Map.<string,SharedCounter>}
     */
    counters = null

    /**
     * @private
     * @type {Map.<string,SharedList>}
     */
    lists = null

    constructor(persistence, namespace) {
        this.persistence = persistence
        this.namespace = namespace
        this.storages = new Map()
        this.counters = new Map()
        this.lists = new Map()
    }

    /**
     * 
     * @param {string} namespace
     * @returns {SharedStorage.<object>} 
     */
    getStorage(namespace) {
        if (!this.storages.has(namespace)) {
            let storage = new SharedStorage(this.persistence, `${this.namespace}:${namespace}`)
            this.storages.set(namespace, storage)
        }
        return this.storages.get(namespace)
    }

    /**
     * 
     * @param {string} namespace
     * @returns {SharedCounter} 
     */
    getCounter(namespace) {
        if (!this.counters.has(namespace)) {
            let counter = new SharedCounter(this.persistence, this.namespace, `counter:${namespace}`)
            this.counters.set(namespace, counter)
        }
        return this.counters.get(namespace)
    }

    /**
     * 
     * @param {string} namespace
     * @returns {SharedList.<object>} 
     */
    getList(namespace) {
        if (!this.lists.has(namespace)) {
            let list = new SharedList(this.persistence, this.namespace, `list:${namespace}`)
            this.lists.set(namespace, list)
        }
        return this.lists.get(namespace)
    }

}

export default DataProvider