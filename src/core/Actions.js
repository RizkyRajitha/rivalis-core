import Actor from './Actor'
import Context from './Context'
import Event from './Event'
import Exception from './Exception'
import { isInstanceOf } from '../utils/helpers'

/**
 * 
 *
 * @callback HandlerCallback
 * @param {Actor} actor
 * @param {string} key
 * @param {any} payload
 * @param {Context} context
 */

/**
 * 
 *
 * @callback FilterCallback
 * @param {Actor} actor
 * @param {Event} event
 * @param {Context} context
 */

class Actions {

    /**
     * @private
     * @type {RegExp}
     */
    keyRegExp = new RegExp(/^[a-z0-9\-_]+$/)

    /**
     * @private
     * @type {Map.<string,Actions>}
     */
    actions = null

    /**
     * @private
     * @type {Map.<string,HandlerCallback>}
     */
    handlers = null

    /**
     * @private
     * @type {Map.<string,FilterCallback>}
     */
    filters = null

    constructor() {
        this.actions = new Map()
        this.handlers = new Map()
        this.filters = new Map()
    }

    /**
     * 
     * @param {string} key 
     * @param {Actions} actions 
     */
    use(key, actions) {
        this.isKeyValid(key)
        if (this.actions.has(key)) {
            throw new Exception(`key = (${key}) is already registered!`)
        }
        if (!isInstanceOf(actions, Actions)) {
            throw new Exception('actions must be an instance of Actions')
        }
        this.actions.set(key, actions)
    }

    /**
     * 
     * @param {string} key 
     * @param {HandlerCallback} handlerCallback 
     */
    handle(key, handlerCallback) {
        this.isKeyValid(key)
        if (this.handlers.has(key)) {
            throw new Exception(`key = (${key}) is already registered!`)
        }
        if (typeof handlerCallback !== 'function') {
            throw new Exception('provided callback is not valid')
        }
        this.handlers.set(key, handlerCallback)
    }

    /**
     * 
     * @param {string} key 
     * @param {FilterCallback} filterCallback 
     */
    filter(key, filterCallback) {
        this.isKeyValid(key)
        if (this.filters.has(key)) {
            throw new Exception(`key = (${key}) is already registered!`)
        }
        if (typeof filterCallback !== 'function') {
            throw new Exception('provided callback is not valid')
        }
        this.filters.set(key, filterCallback)
    }

    /**
     * @private
     * @param {string} key 
     */
    isKeyValid(key) {
        if (!this.keyRegExp.test(key)) {
            throw new Exception(`invalid action key [${key}], key can contain only letters, numbers and dashes`)
        }
    }

    /**
     * @private
     * @param {string} key
     * @returns {Array.<string>}
     */
    tokenize(key) {
        return key.split('.')
    }

    /**
     * @private
     * @param {string} key
     * @returns {Actions}
     */
    getActions(key = '') {
        let tokenized = this.tokenize(key)
        tokenized.pop()
        let actions = this
        while(tokenized.length > 0) {
            actions = actions.actions.get(tokenized.shift()) || null
            if (actions === null) {
                return null
            }
        }
        return actions
    }

}

/**
 * 
 * @param {Actions} actions 
 * @param {string} key 
 * @returns {HandlerCallback}
 */
Actions.getHandler = (actions, key = '') => {
    let target = actions.getActions(key)
    if (target === null) {
        return null
    }
    let name = target.tokenize(key).pop()
    return target.handlers.get(name) || null
}

/**
 * 
 * @param {Actions} actions 
 * @param {string} key 
 * @returns {FilterCallback}
 */
Actions.getFilter = (actions, key = '') => {
    let target = actions.getActions(key)
    if (target === null) {
        return null
    }
    let name = target.tokenize(key).pop()
    return target.filters.get(name) || null
}

export default Actions

/**
 * 
 * @param {string} key 
 * @param {string} value 
 * @returns {string}
 */
Actions.changeLastKey = (key, value) => {
    let list = key.split('.')
    list.pop()
    list.push(value)
    return list.join('.')
}