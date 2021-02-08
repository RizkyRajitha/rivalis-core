import Stage from './Stage'

class StageRegister {

    /**
     * 
     * @private
     * @type {Map.<string, Stage>}
     */
    stages = null

    constructor() {
        this.stages = new Map()
    }

    /**
     * defining stage event handlers for handling lifecycle of the context
     * @param {string} type 
     * @param {Stage} stage 
     */
    define(key, stage) {
        if (this.stages.has(key)) {
            throw new Error(`stage [${key}] is already defined`)
        }
        if (!(stage instanceof Stage)) {
            throw new Error(`stage must be an instance of Stage`)
        }
        this.stages.set(key, stage)
    }

    /**
     * returns already defined instace of stage or null of stage does not exist
     * @param {string} type 
     * @return {Stage}
     */
    get(key) {
        return this.stages.get(key) || null
    }

}

export default StageRegister