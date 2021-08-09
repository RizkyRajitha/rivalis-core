import Exception from './Exception'
import AuthResolver from '../interfaces/AuthResolver'
import Persistence from '../interfaces/Persistence'
import LogReporter from '../interfaces/LogReporter'
import BasicLogReporter from '../adapters/BasicLogReporter'

class Config {

    /**
     * 
     * @type {AuthResolver}
     */
    auth = null

    /**
     * @type {Persistence}
     */
    persistence = null

    reporters = null

    transports = null

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.auth = config.auth || null
        this.persistence = config.persistence || null
        this.reporters = config.reporters || []
        this.transports = config.transports || []
    }

    validate() {
        if (this.auth === null) {
            throw new Exception('[Config validation] auth property must be provided')
        }

        if (typeof this.auth !== 'object') {
            throw new Exception('[Config validation] auth property must be an object')
        }

        if (!this.isObjectValid(this.auth, AuthResolver)) {
            throw new Exception(`[Config validation] auth property must be an instance of AuthResolver`)
        }

        if (this.persistence !== null && typeof this.persistence === 'object') {
            if (!this.isObjectValid(this.persistence, Persistence)) {
                throw new Exception('[Config validation] persistence property must be an instance of Persistence')
            }
        }

        if (this.persistence !== null && typeof this.persistence !== 'object') {
            throw new Exception('[Config validation] persistence property must be an object')
        }

        if (!Array.isArray(this.reporters)) {
            throw new Exception('[Config validation] reporters property must be an array of LogReporter')
        }

        for (let [ index, logReporter ] of this.reporters.entries()) {
            if (!this.isObjectValid(logReporter, LogReporter)) {
                throw new Exception(`[Config validation] reporters[${index}] must be an instance of LogReporter`)
            }
        }


    }

    /**
     * @private
     * @param {object} instance 
     * @param {Function} Class 
     * @param {string} property
     */
    isObjectValid(instance, Class) {
        let methods = this.getListOfMethods(Class)
        for (let method of methods) {
            if (typeof instance[method] !== 'function') {
                return false
            }
        }
        return true
    }

    /**
     * @private
     * @param {Function} Class 
     * @returns {Array.<string>}
     */
    getListOfMethods(Class) {
        return Object.getOwnPropertyNames(Class.prototype).filter(property => property !== 'constructor')
    }

}

export default Config