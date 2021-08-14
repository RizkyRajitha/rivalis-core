import Exception from '../core/Exception'

class Compression {

    /**
     * 
     * @param {string} data 
     * @returns {Uint8Array}
     */
    compress(data) {
        throw new Exception('Compression#compress is not implemented')
    }

    /**
     * 
     * @param {Uint8Array} data 
     * @returns {string}
     */
    decompress(data) {
        throw new Exception('Compression#decompress is not implemented')
    }

}

export default Compression