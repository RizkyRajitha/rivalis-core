import LZString from "lz-string"

class Compression {

    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    compress(data) {
        return LZString.compress(data)
    }

    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    decompress(data) {
        return LZString.decompress(data)
    }

}

export default Compression