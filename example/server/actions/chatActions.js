import { Action, ActionHandler, KVStorage, Response } from '../../../src'

const chatActions = new ActionHandler()

/**
 * 
 * @param {Action} action 
 * @param {string} actorId 
 * @param {KVStorage} storage 
 */
const onMessage = (action, actorId, storage) => {
    return new Response({
        type: Response.Type.EMIT,
        data: action.data
    })
}

chatActions.on('message', onMessage)

export default chatActions