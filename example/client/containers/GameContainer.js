import { GameObjects } from 'phaser'

class GameContainer extends GameObjects.Container {

    agent = null

    constructor(scene, x, y) {
        super(scene, x, y)
        setTimeout(() => this.init())
    }

    init() {
        
    }

    connect(contextId, actorId, token) {
        
    }

}

export default GameContainer