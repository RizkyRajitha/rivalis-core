import Exception from './Exception'
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


/**
 * @class
 */
class Activity {

    /**
     * @private
     * @type {RegExp}
     */
    nameRegExp = new RegExp(/^[a-z0-9]+$/)

    /**
     * @private
     * @type {Map.<string,Activity>}
     */
    activities = null

    /**
     * @private
     * @type {Map.<string,ActionListener>}
     */
    handlers = null

    /**
     * @private
     * @type {Map.<string,FilterListener>}
     */
    filters = null

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * Activity holds listeners for actions and filters.
     * Can be used for chaining and grouping a collection of filters and action handlers.
     * Most of the time, your business logic will live insde listeners registered inside this class.
     */
    constructor() {
        this.activities = new Map()
        this.handlers = new Map()
        this.filters = new Map()
    }

    /**
     * Activity#use method is used for adding child activity under a specific key
     * @param {string} key
     * @param {Activity} activity 
     */
    use(key, activity) {
        this.isKeyValid(key)
        if (!(activity instanceof Activity)) {
            throw new Exception('activity must be an instance of Activity class')
        }
        if (this.activities.has(key)) {
            throw new Exception(`activity with name [${key}] is already registered`)
        }
        this.activities.set(key, activity)
    }

    /**
     * Activity#handle method is used for adding action handler for a specific key
     * The action handler is invoked by execute action inside context.
     * @param {string} key 
     * @param {ActionListener} actionListener 
     */
    handle(key, actionListener) {
        this.isKeyValid(key)
        if (typeof actionListener !== 'function') {
            throw new Exception('actionListener must be a function')
        }
        if (this.handlers.has(key)) {
            throw new Exception(`listener with name [${key}] is already registered`)
        }
        this.handlers.set(key, actionListener)
    }

    /**
     * Activity#filter method is used for adding filter listener for a specific key
     * The filter listener is invoked before an actor receives an event.
     * @param {string} key 
     * @param {FilterListener} filterListener 
     */
    filter(key, filterListener) {
        this.isKeyValid(key)
        if (typeof filterListener !== 'function') {
            throw new Exception('filterListener must be a function')
        }

        if (this.filters.has(key)) {
            throw new Exception(`filter on key [${key}] is already registered`)
        }
        this.filters.set(key, filterListener)
    }

    /**
     * @private
     * @param {string} key 
     */
    isKeyValid(key) {
        if (!this.nameRegExp.test(key)) {
            throw new Exception(`invalid activity key [${key}], key can contain only letters & numbers`)
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
        return target.handlers.get(handlerKey) || null
    }
}

/**
 * 
 * @param {Activity} activity 
 * @param {string} key 
 * @returns {FilterListener|null}
 */
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