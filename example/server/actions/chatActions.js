import { ActionHandler, Response } from "../../../src";

const chatActions = new ActionHandler()

chatActions.on('message', (message, systems) => {

    return new Response({
        type: Response.Type.EVENT,
        data: message.data
    })
})

export default chatActions