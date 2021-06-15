import Context from './Context'
import Actor from './Actor'
import Event from './Event'

/**
 * 
 *
 * @callback ActionListener
 * @param {Actor} actor
 * @param {string} key
 * @param {any} data
 * @param {Context} context
 */

/**
 * 
 *
 * @callback FilterListener
 * @param {Actor} actor
 * @param {Event} event
 * @param {Context} context
 */

class Activity {

    /**
     * 
     * @private
     * @type {RegExp}
     */
    nameRegExp = new RegExp(/^[a-z0-9]+$/)

    /**
     * 
     * @private
     * @type {Map.<string,Activity>}
     */
    activities = null

    /**
     * 
     * @private
     * @type {Map.<string,ActionListener>}
     */
    listeners = null

    /**
     * 
     * @private
     * @type {Map.<string,FilterListener>}
     */
    filters = null

    constructor() {
        this.activities = new Map()
        this.listeners = new Map()
        this.filters = new Map()
    }

    /**
     * 
     * @param {string} key
     * @param {Activity} activity 
     */
    use(key, activity) {
        this.isKeyValid(key)
        if (!(activity instanceof Activity)) {
            throw new Error('activity must be an instance of Activity class')
        }
        if (this.activities.has(key)) {
            throw new Error(`activity with name [${key}] is already registered`)
        }
        this.activities.set(key, activity)
    }

    /**
     * 
     * @param {string} key 
     * @param {ActionListener} actionListener 
     */
    handle(key, actionListener) {
        this.isKeyValid(key)
        if (typeof actionListener !== 'function') {
            throw new Error('actionListener must be a function')
        }
        if (this.listeners.has(key)) {
            throw new Error(`listener with name [${key}] is already registered`)
        }
        this.listeners.set(key, actionListener)
    }

    /**
     * 
     * @param {string} key 
     * @param {FilterListener} filterListener 
     */
    filter(key, filterListener) {
        this.isKeyValid(key)
        if (typeof filterListener !== 'function') {
            throw new Error('filterListener must be a function')
        }

        if (this.filters.has(key)) {
            throw new Error(`filter on key [${key}] is already registered`)
        }
        this.filters.set(key, filterListener)
    }

    /**
     * 
     * @private
     * @param {string} key 
     */
    isKeyValid(key) {
        if (!this.nameRegExp.test(key)) {
            throw new Error(`invalid activity key [${key}], key can contain only letters & numbers`)
        }
    }
}

/**
 * 
 * @param {Activity} activity 
 * @param {Array.<string>} keyList 
 * @returns {Activity}
 */
const resolveActivity = (activity, keyList = []) => {
    let childActivity = activity
    for (let key of keyList) {
        if (childActivity.activities.has(key)) {
            childActivity = childActivity.activities.get(key)
        } else {
            return null
        }
    }
    return childActivity
}

/**
 * 
 * @param {Activity} activity 
 * @param {string} key
 * @returns {ActionListener|null}
 */
Activity.getHandler = (activity, key) => {
    let list = key.split('.')
    let handlerKey = list.pop()
    let target = resolveActivity(activity, list)
    if (target === null) {
        return null
    } else {
        return target.listeners.get(handlerKey) || null
    }
}

Activity.getFilter = (activity, key) => {
    let list = key.split('.')
    let handlerKey = list.pop()
    let target = resolveActivity(activity, list)
    if (target === null) {
        return null
    } else {
        return target.filters.get(handlerKey) || null
    }
}



export default Activity