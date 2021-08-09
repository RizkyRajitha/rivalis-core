import Config from './Config'

class Node {

    /**
     * @private
     * @type {Config}
     */
    config = null

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.config = new Config(config)
    }



    define() {

    }

    create() {

    }

    obtain() {

    }

    destroy() {

    }
}

export default Node