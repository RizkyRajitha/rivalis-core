import Exception from "../core/Exception"

/**
 * @template T
 */
 class Codec {

    /**
     * @private
     * @type {Array.<string>}
     */
    propertyList = null

    /**
     * @type {Function}
     */
    classType = null

    /**
     * 
     * @param {Function} [classType] 
     */
    constructor(classType = null) {
        let instance = null
        try {
            instance = new classType()
        } catch (error) {
            throw new Exception(`[codec] failed to get property list, ${error.message}`)
        }
        this.propertyList = Object.keys(instance)
        this.classType = classType
    }

    /**
     * 
     * @param {T} data 
     * @returns {Array.<any>}
     */
    encode(data) {
        let list = []
        for (let property of this.propertyList) {
            list.push(data[property])
        }
        return list
    }

    /**
     * 
     * @param {Array.<any>} data 
     * @returns {T}
     */
    decode(data) {
        let object = {}
        for (let i = 0; i < data.length; i++) {
            object[this.propertyList[i]] = data[i]
        }
        if (this.classType !== null) {
            object = new this.classType(object)
        }
        return object
    }

}

export default Codec