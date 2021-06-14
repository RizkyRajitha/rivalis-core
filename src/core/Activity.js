import Context from './Context'
import Actor from './Actor'
import Event from './Event'

/**
 * 
 *
 * @callback ActionListener
 * @param {Actor} actor
 * @param {any} data
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

    constructor() {
        this.activities = new Map()
        this.listeners = new Map()
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
    register(key, actionListener) {
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
     * @private
     * @param {string} key 
     */
    isKeyValid(key) {
        if (!this.nameRegExp.test(key)) {
            throw new Error(`invalid activity namespace [${key}]`)
        }
    }
}

/**
 * 
 * @param {Activity} activity 
 * @param {string} key
 * @returns {ActionListener|null}
 */
Activity.getListener = (activity, key) => {
    let activities = key.split('.')
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

export default Activity