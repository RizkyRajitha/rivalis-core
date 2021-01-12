import ListStorageAdapter from '../ListStorageAdapter'

class InMemoryListStorageAdapter extends ListStorageAdapter {
    
    data = {}

    /**
     * 
     * @returns {Promise.<any>}
     */
    initalize = () => Promise.resolve()

    /**
     * 
     * @param {string} namespace 
     * @param {any} value 
     * @returns {Promise.<any>}
     */
    push(namespace, value) {
        this.checkNamespace(namespace)
        this.data[namespace].push(value)
        return Promise.resolve()
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    pop(namespace) {
        this.checkNamespace(namespace)
        const value = this.data[namespace].pop(value)
        return Promise.resolve(value)
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<Array.<any>>}
     */
    getAll(namespace) {
        this.checkNamespace(namespace)
        return Promise.resolve(this.data[namespace])
    }

    /**
     * 
     * @param {string} namespace 
     * @returns {Promise.<any>}
     */
    delete(namespace) {
        this.checkNamespace(namespace)
        this.data[namespace] = []
        return Promise.resolve()
    }

    checkNamespace(namespace) {
        if (typeof this.data[namespace] === 'undefined') {
            this.data[namespace] = []
        }
    }
}

export default InMemoryListStorageAdapter