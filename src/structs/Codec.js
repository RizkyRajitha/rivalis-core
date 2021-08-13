import Exception from '../core/Exception'
import Compression from '../interfaces/Compression'

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
     * @private
     * @type {Function}
     */
    classType = null

    /**
     * @private
     * @type {Compression}
     */
    compression = null

    /**
     * 
     * @param {Function} classType 
     * @param {Compression} [compression]
     */
    constructor(classType, compression = null) {
        let instance = null
        try {
            instance = new classType()
        } catch (error) {
            throw new Exception(`[codec] failed to get property list, ${error.message}`)
        }
        this.propertyList = Object.keys(instance)
        this.classType = classType
        this.compression = compression
    }

    /**
     * 
     * @param {T} data 
     * @returns {string|Uint8Array}
     */
    encode(data) {
        let list = []
        for (let property of this.propertyList) {
            list.push(data[property])
        }
        let output = JSON.stringify(list)
        if (this.compression !== null) {
            return this.compression.compress(output)
        }
        return output
    }

    /**
     * 
     * @param {string|Uint8Array} data 
     * @returns {T}
     */
    decode(data) {
        if (this.compression !== null && typeof data !== 'string') {
            data = this.compression.decompress(data)
        } else if (this.compression === null && typeof data !== 'string') {
            throw new Exception('the compression needs to be enabled to decompress binary data type')
        }
        data = JSON.parse(data)
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