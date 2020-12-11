import { v4 as uuid } from 'uuid'

class Entity {

    id = null

    options = {}

    /**
     * 
     * @param {Object} options 
     */
    constructor(id, options = {}) {
        this.id = id
        this.options = options || {}
    }

    get = key => this.options[key] || null

}

export default Entity