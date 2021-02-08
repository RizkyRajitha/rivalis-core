import { ActionHandler, Context, Stage } from '../../../src'
import chatActions from '../actions/chatActions'
class PvPStage extends Stage {

    /**
     * 
     * @param {string} id 
     * @param {Object.<string, any>} settings 
     */
    onCreate(id, settings) {
        console.log('PvPStage:', 'context created', id, settings)
    }

    /**
     * 
     * @param {ActionHandler} actions 
     * @param {Object.<string, any>} settings 
     */
    onInit(actions, settings) {
        actions.use('chat', chatActions)
        console.log('PvPStage:', 'context initalized', settings)
    }

    /**
     * 
     * @param {Context} context 
     * @param {Actor} actor
     */
    onJoin(context, actor) {
        console.log('PvPStage:', actor.id, 'joins context with data', actor.data)
    }

    /**
     * 
     * @param {Context} context 
     * @param {Actor} actor
     */
    onLeave(context, actor) {
        console.log('PvPStage:', actor.id, 'leaves context with data', actor.data)
    }

    /**
     * 
     * @param {Context} context 
     */
    onDispose(context) {
        console.log('PvPStage:', 'context before disposing')
    }

}

export default PvPStage