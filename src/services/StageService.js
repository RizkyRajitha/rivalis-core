import Stage from '../core/Stage'

class StageService {

    /**
     * @private
     * @type {Map.<string,Stage>}
     */
    cache = null

    constructor() {
        this.cache = new Map()
    }

    /**
     * 
     * @param {string} type 
     * @param {Stage} stage 
     * @returns {this}
     */
    define(type, stage) {
        if (this.cache.has(type)) {
            throw new Exception(`stage type=(${type}) already exist!`)
        }
        this.cache.set(type, stage)
        return this
    }

    /**
     * 
     * @param {string} type 
     * @returns {boolean}
     */
    exist(type) {
        return this.cache.has(type)
    }

}

/**
 * 
 * @param {StageService} stageService 
 * @param {string} type
 * @returns {Stage}
 */
StageService.getStage = (stageService, type) => {
    return stageService.cache.get(type)
}

/**
 * 
 * @param {StageService} stageService 
 */
StageService.removeAll = stageService => {
    stageService.cache.clear()
}

export default StageService