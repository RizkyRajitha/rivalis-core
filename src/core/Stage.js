import Event from '../models/Event'
import Actions from './Actions'
import Context from './Context'

class Stage extends Actions {

    /**
     * 
     * @param {Context} context 
     */
    async onInit(context) {}

    /**
     * 
     * @param {Context} context 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     */
    async onJoin(context, id, data) {}

    /**
     * 
     * @param {Context} context 
     * @param {Event} event 
     */
    async onEmit(context, event) {}

    /**
     * 
     * @param {Context} context 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     */
    async onLeave(context, id, data) {}

    /**
     * 
     * @param {Context} context 
     */
    async onDispose(context) {}

}

export default Stage