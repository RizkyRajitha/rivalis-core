import ActionHandler from '../contexts/ActionHandler'
import Actor from '../contexts/Actor'
import Context from '../contexts/Context'

class Stage {

    /**
     * 
     * @param {string} id 
     * @param {Object.<string, any>} settings 
     */
    onCreate(id, settings) {}

    /**
     * 
     * @param {ActionHandler} actions 
     * @param {Object.<string, any>} settings 
     */
    onInit(actions, settings) {}

    /**
     * 
     * @param {Context} context 
     * @param {Actor} actor
     */
    onJoin(context, actor) {}

    /**
     * 
     * @param {Context} context 
     * @param {Actor} actor
     */
    onLeave(context, actor) {}

    /**
     * 
     * @param {Context} context 
     */
    onDispose(context) {}

}

export default Stage