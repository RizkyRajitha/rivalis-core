import { v4 as uuid } from 'uuid'
import Actor from '../contexts/Actor'
import Connector from './Connector'

class Connection {

    /**
     * 
     * @type {string}
     */
    id = null

    /**
     * 
     * @private
     * @type {Connector}
     */
    connector = null

    /**
     * 
     * @type {Actor}
     */
    actor = null

    /**
     * 
     * @param {string} message 
     */
    onmessage = (message) => {}

    /**
     * 
     * @param {string} code 
     * @param {string} message 
     */
    onclose = (code, message) => {}

    /**
     * 
     * @param {Connector} connector 
     */
    constructor(connector) {
        this.id = uuid()
        this.connector = connector
    }

    /**
     * 
     * @param {('open'|'close'|'error'|'message')} event 
     * @param {any} data 
     */
    handle(event, data) {
        if (event === 'open') {
            this.initalize()
        } else {
            
        }
        console.log(`event: ${event}, data: ${JSON.stringify(data)}`)
    }

    dispose() {
        // TODO: dispose
        console.log('dispose')
    }

}

export default Connection