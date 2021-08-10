import Exception from '../core/Exception'

class Transport {

    /**
     * initialize transport layer
     * @returns {Promise.<void>}
     */
    async init() {
        throw new Exception('Transport#init is not implemented')
    }

    /**
     * dispose transport layer
     * @returns {Promise.<void>}
     */
    async dispose() {
        throw new Exception('Transport#dispose is not implemented')
    }

}

export default Transport