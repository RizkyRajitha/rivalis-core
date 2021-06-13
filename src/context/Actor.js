import { emit } from 'process'
import { Signal } from 'signals'
import Activity from './Activity'
import Context from './Context'
import Event from './Event'

/**
 * @callback EventListener
 * @param {Event} event
 */


class Actor {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @type {Object.<string,any>}
     */
    data = null

    /**
     * 
     * @private
     * @type {Context}
     */
    context = null

    /**
     * 
     * @private
     * @type {Signal.<Event>}
     */
    eventReceiver = new Signal()

    constructor(id, data, context) {
        this.id = id
        this.data = data
        this.context = context
        this.context.events.subscribe(this.handleEvent, this)
    }


    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    addListener = (listener, context) => {
        this.eventReceiver.add(listener, context)
    }

    /**
     * 
     * @param {EventListener} listener 
     * @param {any} context 
     */
    removeListener = (listener, context) => {
        this.eventReceiver.remove(listener, context)
    }

    /**
     * 
     * @param {string} namespace 
     * @param {any} data 
     * @returns {Promise.<any>}
     */
    execute(namespace, data) {
        return this.context.actions.execute(this, namespace, data)
    }

    /**
     * 
     * @param {Event} event 
     */
    send(event) {
        this.eventReceiver.dispatch(event)
    }
    
    /**
     * 
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        let filterListener = Activity.getFilter(this.context.activity, event.namespace)
        if (filterListener === null) {
            return this.send(event)
        }
        let filter = filterListener(event, this.context)
        if (typeof filter === 'boolean' && filter === true) {
            return this.send(event)
        }
        filter.then(filtered => {
            if (filtered) {
                this.send(event)
            }      
        })
    }

    dispose() {
        this.context.events.unsubscribe(this.handleEvent, this)
        // TODO: implement this
    }

}

export default Actor