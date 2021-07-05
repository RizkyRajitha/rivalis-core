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

export default AuthResolver