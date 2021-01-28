import Stage from './Stage'

class StageRegister {

    /**
     * 
     * @private
     * @type {Object.<string, Stage>}
     */
    stageMap = {}

    /**
     * defining stage event handlers for handling lifecycle of the context
     * @param {string} type 
     * @param {Stage} stage 
     */
    define(type, stage) {

        if (typeof this.stageMap[key] !== 'undefined') {
            throw new Error(`stage [${key}] is already defined`)
        }

        if (!(stage instanceof Stage)) {
            throw new Error(`stage must be an instance of Stage`)
        }

        this.stageMap[key] = stage
    }

    /**
     * returns already defined instace of stage or null of stage does not exist
     * @param {string} type 
     * @return {Stage}
     */
    get(type) {
        return this.stageMap[key] || null
    }

}

export default StageRegister