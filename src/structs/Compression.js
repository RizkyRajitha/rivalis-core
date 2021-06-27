import LZString from "lz-string"

class Compression {

    /**
     * 
     * @param {string} data 
     * @returns {Uint8Array}
     */
    compress(data) {
        return LZString.compressToUint8Array(data)
    }

    /**
     * 
     * @param {Uint8Array} data 
     * @returns {string}
     */
    decompress(data) {
        return LZString.decompressFromUint8Array(data)
    }

}

export default Compression