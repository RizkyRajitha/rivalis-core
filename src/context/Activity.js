import Context from './Context'
import Actor from './Actor'
import Event from './Event'

/**
 * Callback for handling actions
 *
 * @callback ActionListener
 * @param {Actor} actor
 * @param {any} data
 * @param {Context} context
 */

/**
 * 
 * @callback FilterListener
 * @param {Event} event
 * @param {Context} context
 * @returns {boolean|Promise.<boolean>}
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
     * @param {string} namespace
     * @param {Activity} activity 
     */
    use(namespace, activity) {
        this.validateNamespace(namespace)
        if (!(activity instanceof Activity)) {
            throw new Error('activity must be an instance of Activity class')
        }
        if (this.activities.has(namespace)) {
            throw new Error(`activity with name [${namespace}] is already registered`)
        }
        this.activities.set(namespace, activity)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {ActionListener} actionListener 
     */
    on(namespace, actionListener) {
        this.validateNamespace(namespace)
        if (typeof actionListener !== 'function') {
            throw new Error('actionListener must be a function')
        }
        if (this.listeners.has(namespace)) {
            throw new Error(`listener with name [${namespace}] is already registered`)
        }
        this.listeners.set(namespace, actionListener)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {FilterListener} filterListener 
     */
    filter(namespace, filterListener) {
        this.validateNamespace(namespace)
        if (typeof filterListener !== 'function') {
            throw new Error('filterListener must be a function')
        }
        if (this.filters.has(namespace)) {
            throw new Error(`filter with name [${namespace}] is already registered`)
        }
        this.filters.set(namespace, filterListener)
    }

    validateNamespace(namespace) {
        if (!this.nameRegExp.test(namespace)) {
            throw new Error(`invalid activity namespace [${namespace}]`)
        }
    }
}

/**
 * 
 * @param {Activity} activity 
 * @param {string} namespace
 * @returns {ActionListener|null}
 */
Activity.getListener = (activity, namespace) => {
    let activities = namespace.split('.')
    if (activities.length === 1) {
        return activity.listeners.get(activities[0])
    } else {
        let childActivity = activity.activities.get(activities[0])
        if (childActivity) {
            activities.shift()
            return Activity.getListener(childActivity, activities.join('.'))
        }
        return null
    }
}

/**
 * 
 * @param {Activity} activity 
 * @param {string} namespace
 * @returns {FilterListener|null} 
 */
Activity.getFilter = (activity, namespace) => {
    let activities = namespace.split('.')
    if (activities.length === 1) {
        return activity.filters.get(activities[0])
    } else {
        let childActivity = activity.activities.get(activities[0])
        if (childActivity) {
            activities.shift()
            return Activity.getFilter(childActivity, activities.join('.'))
        }
        return null
    }
}

export default Activity