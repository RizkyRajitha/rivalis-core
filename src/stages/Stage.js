import ActionHandler from '../contexts/ActionHandler'
import Context from '../contexts/Context'

class Stage {

    /**
     * 
     * @param {ActionHandler} actions 
     * @param {object} settings 
     */
    onInit(actions, settings) {}

    /**
     * 
     * @param {Context} context 
     * @param {object} settings 
     */
    onCreate(context) {}

    /**
     * 
     * @param {Context} context 
     * @param {string} id 
     * @param {object} data 
     */
    onJoin(context, id, data) {}

    /**
     * 
     * @param {Context} context 
     * @param {string} id 
     */
    onLeave(context, id) {}

    /**
     * 
     * @param {Context} context 
     */
    onDispose(context) {}

}

export default Stage