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
     * @param {Array.<string>} propertyList 
     * @param {Function} [classType] 
     */
    constructor(propertyList, classType = null) {
        this.propertyList = propertyList
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
            object[this.propertyList[0]] = data[0]
        }
        if (this.classType !== null) {
            object = new this.classType(object)
        }
        return object
    }

}

export default Codec