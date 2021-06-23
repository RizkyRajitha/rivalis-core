/**
 * @typedef Auth
 * @property {string} contextId
 * @property {string} actorId
 * @property {Object.<string,any>} data
 */

import Exception from '../helpers/Exception'

class AuthResolver {

    /**
     * @param {string} ticket 
     * @returns {Promise.<Auth>}
     */
    onAuth(ticket) {
        return Promise.reject(new Exception('AuthResolver#onAuth is not implemented'))
    } 

}

export default AuthResolver