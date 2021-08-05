import Exception from '../core/Exception'
import Node from '../core/Node'
import Actor from '../core/Actor'

class AuthResolver {

    /**
     * 
     * @param {string} ticket
     * @param {Node} node
     * @returns {Promise<Actor>|Actor} 
     */
    onAuth(ticket, node) {
        throw new Exception('AuthResolver#onAuth is not implemented') // TODO: write error message
    }

}

export default AuthResolver