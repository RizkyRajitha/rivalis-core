import Persistence from '../interfaces/Persistence'
import SharedCounter from './SharedCounter'
import SharedList from './SharedList'
import SharedStorage from './SharedStorage'

class SharedDataAPI extends SharedStorage {

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
        super(persistence, `world:${namespace}`)
        this.counters = new Map()
        this.lists = new Map()
    }

    /**
     * 
     * @param {string} key
     * @returns {SharedCounter} 
     */
    getCounter(key) {
        if (!this.counters.has(key)) {
            let counter = new SharedCounter(this.persistence, this.namespace, key)
            this.counters.set(key, counter)
        }
        return this.counters.get(key)
    }

    /**
     * 
     * @param {string} key
     * @returns {SharedList.<object>} 
     */
    getList(key) {
        if (!this.lists.has(key)) {
            let list = new SharedList(this.persistence, this.namespace, key)
            this.lists.set(key, list)
        }
        return this.lists.get(key)
    }

    async wipe() {
        let keys = await super.keys()
        for (let key of keys) {
            await this.delete(key)
        }
    }

}

export default SharedDataAPI