import Exception from '../core/Exception'
import Node from '../core/Node'

class Transport {

    /**
     * initialize transport layer
     * @param {Node} node
     * @returns {Promise.<void>}
     */
    async init(node) {
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