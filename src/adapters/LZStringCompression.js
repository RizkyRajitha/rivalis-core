import LZString from 'lz-string'
import Compression from '../interfaces/Compression'

class LZStringCompression extends Compression {

    /**
     * 
     * @param {string} data 
     * @returns {Uint8Array}
     * @returns {Uint8Array}
     */
    compress(data) {
        return LZString.compressToUint8Array(data)
    }

    /**
     * 
     * @param {Uint8Array} data 
     * @returns {string}
     * @returns {string}
     */
    decompress(data) {
        return LZString.decompressFromUint8Array(data)
    }

}

export default LZStringCompression