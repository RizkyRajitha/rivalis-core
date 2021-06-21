import Context from '../core/Context'
import Event from '../core/Event'

class Stage {

    /**
     * 
     * @param {Context} context 
     */
    onInit(context) {}

    /**
     * 
     * @param {Context} context 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     */
    onJoin(context, id, data) {}

    /**
     * 
     * @param {Context} context 
     * @param {string} id 
     * @param {Object.<string,any>} data 
     */
    onLeave(context, id, data) {}

    /**
     * 
     * @param {Context} context 
     * @param {Event} event 
     */
    onEmit(context, event) {}

    /**
     * 
     * @param {Context} context 
     */
    onDispose(context) {}

}

export default Stage