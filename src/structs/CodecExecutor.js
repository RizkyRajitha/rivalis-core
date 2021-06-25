import LZString from 'lz-string'

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
     * @type {Array.<string>}
     */
    propList = null

    /**
     * @private
     * @type {CastFn}
     */
    castFn =  null

    /**
     * @private
     * @type {string}
     */
    signature = null

    /**
     * 
     * @param {Array.<string>} propList 
     * @param {CastFn} castFn 
     * @param {string} signature
     */
    constructor(propList, signature, castFn) {
        this.propList = propList
        this.castFn = castFn
        this.signature = signature
    }

    /**
     * @param {T} object
     * @returns {string} 
     */
    encode(object) {
        let list = []
        for (let prop of this.propList) {
            list.push(object[prop])
        }
        let text = JSON.stringify(list)
        return LZString.compressToBase64(text)
    }

    /**
     * 
     * @param {string} data 
     * @returns {T}
     */
    decode(data) {
        let json = LZString.decompressFromBase64(data)
        let list = JSON.parse(json)
        return this.castFn(list, this.propList)
    }

}

export default CodecExecutor