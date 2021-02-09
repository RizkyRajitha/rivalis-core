import Phaser from 'phaser'
import GameContainer from './containers/GameContainer'
import ServerList from './containers/ServerList'
import WSAgent from './WSAgent'

class LobbyScene extends Phaser.Scene {

    serverList = null
    gameContainer = null
    actorId = null

    constructor(actorId) {
        super()
        this.actorId = actorId
    }

    preload() {
        this.load.image('background', 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80')
    }

    create() {
        const background = this.add.image(0, 0, 'background').setOrigin(0)
        this.serverList = new ServerList(this, 0, 0)
        this.gameContainer = new GameContainer(this, 20, 230)
        this.agent = new WSAgent()
    }

}

class Game extends Phaser.Game {
    constructor(parent, actorId) {
        super({ parent, scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        }, width:1000, height: 667 })
        this.scene.add('lobby', new LobbyScene(actorId), true)
    }
}

export default Game