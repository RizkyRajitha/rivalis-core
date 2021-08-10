import Exception from './Exception'
import AuthResolver from '../interfaces/AuthResolver'
import Persistence from '../interfaces/Persistence'
import LogReporter from '../interfaces/LogReporter'
import Transport from '../interfaces/Transport'
import { isInstanceOf, isPropertyValid } from '../utils/helpers'
import InMemoryStore from '../adapters/InMemoryStore'
import BasicLogReporter from '../adapters/BasicLogReporter'
import Logger from './Logger'

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

    /**
     * @type {Array.<LogReporter>}
     */
    reporters = null

    /**
     * @type {Array.<Transport>}
     */
    transports = null

    /**
     * @type {number}
     */
    loggerLevel = null

    /**
     * 
     * @param {Config} config 
     */
    constructor(config = {}) {
        this.auth = config.auth || null
        this.persistence = config.persistence || null
        this.reporters = config.reporters || []
        this.transports = config.transports || []
        this.loggerLevel = config.loggerLevel || Logger.LEVEL.INFO
    }

}

/**
 * 
 * @param {Config} config 
 */
Config.validate = config => {
    if (!isPropertyValid(config.auth, 'object', true)) {
        throw new Exception('[Config] the auth property must be an object')
    } else if (!isInstanceOf(config.auth, AuthResolver)) {
        throw new Exception('[Config] the auth property must implements AuthResolver')
    }

    if (!isPropertyValid(config.persistence, 'object', false)) {
        throw new Exception('[Config] the persistence property must be an object')
    }

    if (config.persistence !== null && !isInstanceOf(config.persistence, Persistence)) {
        throw new Exception('[Config] the persistence property must implements Persistence')
    }

    if (!Array.isArray(config.reporters)) {
        throw new Exception('[Config] the reporters property must be an array of LogReporter instances')
    }

    for (let [ index, logReporter ] of config.reporters.entries()) {
        if (!isInstanceOf(logReporter, LogReporter)) {
            throw new Exception(`[Config] the reporters[${index}] array item must implements LogReporter`)
        }
    }

    if (!Array.isArray(config.transports)) {
        throw new Exception('[Config] the transports property must be an array of Transport instances')
    }

    for (let [ index, transport ] of config.transports.entries()) {
        if (!isInstanceOf(transport, Transport)) {
            throw new Exception(`[Config] the transports[${index}] array item must implements Transport`)
        }
    }

    // TODO: validate logger level

    if (config.persistence === null) {
        config.persistence = new InMemoryStore()
    }

    if (config.reporters.length === 0) {
        config.reporters.push(new BasicLogReporter())
    }


}

export default Config