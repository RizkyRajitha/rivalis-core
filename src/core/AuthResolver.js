import Exception from './Exception'

/**
 * @typedef Auth
 * @property {string} contextId
 * @property {string} actorId
 * @property {Object.<string,any>} data
 */

/**
 * @interface AuthResolver
 * 
 * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
 * @author Daniel Kalevski
 * @since 0.5.0
 * 
 * // TODO: write description
 * 
 */
class AuthResolver {

    /**
     * @param {string} ticket 
     * @returns {Promise.<Auth>}
     */
    onAuth(ticket) {
        return Promise.reject(new Exception('AuthResolver#onAuth is not implemented', Exception.Code.AUTH_FAILED))
    } 

}

/**
 * 
 * @param {any} auth 
 */
AuthResolver.validate = auth => {
    if (typeof auth !== 'object' || auth === null) {
        throw new Exception('auth object provided by AuthResolver#onAuth must be an object, structured like: { contextId, actorId, data }')
    }
    if (typeof auth.contextId !== 'string') {
        throw new Exception('AuthResolver#onAuth().contextId must be a string')
    }
    if (typeof auth.actorId !== 'string') {
        throw new Exception('AuthResolver#onAuth().actorId must be a string')
    }
    if (typeof auth.data !== 'object' || auth.data === null) {
        throw new Exception('AuthResolver#onAuth().data must be an object')
    }
}

export default AuthResolver