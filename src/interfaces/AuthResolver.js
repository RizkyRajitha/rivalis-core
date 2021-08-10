import Exception from '../core/Exception'
import Node from '../core/Node'
import Actor from '../core/Actor'

class AuthResolver {

    /**
     * 
     * @param {string} ticket
     * @param {Node} node
     * @returns {Promise<Actor>} 
     */
    async onAuth(ticket, node) {
        throw new Exception('AuthResolver#onAuth is not implemented')
    }

}

export default AuthResolver