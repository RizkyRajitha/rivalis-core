import { ActionHandler, Response } from "../../../src";

const chatActions = new ActionHandler()

chatActions.on('message', action => {
    console.log('processing action', action)
    return new Response({
        type: Response.Type.EMIT,
        data: action.data
    })
})

export default chatActions