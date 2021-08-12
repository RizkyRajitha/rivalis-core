import { Context, Stage } from '../src'

class GameWorld extends Stage {
    
    onCreate(context) {
        context.logger.error('test')
    }

}

export default GameWorld