import Phaser from 'phaser'
import GameContainer from './containers/GameContainer'
import ServerList from './containers/ServerList'

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

        this.serverList.events.on('refresh', () => {
            fetch('/contexts').then(response => response.json()).then(server => {
                this.serverList.setServers(server)
            })
        })

        this.serverList.events.on('create', () => {
            fetch('/contexts', { method: 'post' }).then(response => response.json())
        })

        this.serverList.events.on('obtain', contextId => {
            fetch(`/contexts/${contextId}/${this.actorId}`, { method: 'post' }).then(response => response.json()).then(slot => {
                this.serverList.setToken(slot.token)
            })
        })

        this.serverList.events.on('join', ({ contextId, token }) => {
            this.gameContainer.connect(contextId, this.actorId, token)
        })
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