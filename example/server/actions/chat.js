import { ActionHandlerGroup } from '../../../src'

const chatActionHandlers = new ActionHandlerGroup()

chatActionHandlers.on('message', (action, actorId, contextId) => {
    return action.data
})

export default chatActionHandlers