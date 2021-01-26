class EventProvider {

    /**
     * 
     * @private
     * @type {Signal.<Event>}
     */
    eventReceiver = new Signal()

    /**
     * 
     * @param {EventListener} listener 
     * @param {object} context 
     */
    addListener = (listener, context) => this.eventReceiver.add(listener, context)

    /**
     * 
     * @param {EventListener} listener 
     * @param {object} context 
     */
    removeListener = (listener, context) => this.eventReceiver.remove(listener, context)

    /**
     * 
     * @returns {Promise.<Array.<Event>>}
     */
    getAll() {
        
    }

    /**
     * 
     * @param {Event} event 
     * @returns {Promise.<any>}
     */
    emit(event) {
        
    }

    /**
     * 
     * @private
     * @returns {Promise.<any>}
     */
    dispose() {
        return this.config.adapters.messaging.unsubscribe(this.contextId, 'events', this.messageHandler)
    }

    /**
     * 
     * @private
     * @param {any} message 
     */
    messageHandler = message => {
        const event = new Event(message)
        this.eventReceiver.dispatch(event)
    }

}

export default EventProvider