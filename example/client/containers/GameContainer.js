import { GameObjects } from 'phaser'
import WSAgent from '../WSAgent'

class GameContainer extends GameObjects.Container {

    agent = null

    constructor(scene, x, y) {
        super(scene, x, y)
        setTimeout(() => this.init())
    }

    init() {
        
    }

    connect(contextId, actorId, token) {
        this.agent = new WSAgent(contextId, actorId, token)
        this.agent.on('connect', () => {
            console.log(`${actorId} connected!`)
        })

        this.agent.on('event', event => {

        })
    }

}

export default GameContainer