import { ActionHandler, Context, Stage } from '../../../src'
import chatActions from '../actions/chatActions'
class TestStage extends Stage {

    /**
     * 
     * @param {ActionHandler} actions 
     * @param {any} settings 
     */
    onInit(actions, settings) {
        actions.use('chat', chatActions)
    }

    /**
     * 
     * @param {Context} context 
     * @param {any} settings 
     */
    onCreate(context) {
        
    }

    /**
     * 
     * @param {Context} context 
     * @param {string} id 
     * @param {any} data 
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

export default TestStage