import LZString from 'lz-string'
import Compression from './Compression'

/**
 * @template T
 */
 class CodecExecutor {

    /**
     * @callback CastFn
     * @param {Array.<any>} message
     * @param {Array.<string>} propList
     * @returns {T}
     */

    /**
     * @private
     * @type {Compression}
     */
    compression = null

    /**
     * @private
     * @type {Array.<string>}
     */
    propList = null

    /**
     * @private
     * @type {CastFn}
     */
    castFn =  null

    /**
     * 
     * @param {Compression} compression
     * @param {Array.<string>} propList 
     * @param {CastFn} castFn
     */
    constructor(compression, propList, castFn) {
        this.compression = compression
        this.propList = propList
        this.castFn = castFn
    }

    /**
     * @param {T} object
     * @returns {Uint8Array} 
     */
    encode(object) {
        let list = []
        for (let prop of this.propList) {
            list.push(object[prop])
        }
        let data = JSON.stringify(list)
        return this.compression.compress(data)
    }

    /**
     * 
     * @param {Uint8Array} data 
     * @returns {T}
     */
    decode(data) {
        let json = this.compression.decompress(data)
        let list = JSON.parse(json)
        return this.castFn(list, this.propList)
    }

}

export default CodecExecutor