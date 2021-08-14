import { Actions, Context, Stage, Event } from '../src'

class GameWorld extends Stage {
    
    onCreate(context) {
        context.logger.error('test')
        let actions = new Actions()
        actions.handle('test', async (actor, key, data, context) => {
            actor.send(key, data)
        })
        this.use('actions', actions)
        
    }

}

export default GameWorld