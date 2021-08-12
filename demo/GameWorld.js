import { Actions, Context, Stage } from '../src'
import Event from '../src/models/Event'

class GameWorld extends Stage {
    
    onCreate(context) {
        context.logger.error('test')
        let actions = new Actions()
        actions.handle('test', async (actor, key, data, context) => {
            await context.data.getList('mylist').push(data)
            context.emit(new Event(key, data, actor.id))
        })
        this.use('actions', actions)
        
    }

}

export default GameWorld