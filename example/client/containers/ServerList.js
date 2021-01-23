import EventEmitter from 'eventemitter3'
import { GameObjects } from 'phaser'

const buttonStyle = {
    backgroundColor: '#7cb342',
    padding: 10,
    fixedWidth: 150,
    align: 'center'
}

class ServerList extends GameObjects.Container {

    events = new EventEmitter()
    
    serverList = []
    statusText = null
    selectedGame = null
    gameToken = null


    constructor(scene, x, y) {
        super(scene, x, y)
        setTimeout(() => this.init(), 0)
    }

    init() {
        const create = this.scene.add.text(830, 20, 'Create Game', buttonStyle).setInteractive()
        const obtain = this.scene.add.text(830, 65, 'Obtain Token', buttonStyle).setInteractive()
        const join = this.scene.add.text(830, 110, 'Join', buttonStyle).setInteractive()

        create.on('pointerdown', () => this.events.emit('create'))
        obtain.on('pointerdown', () => this.events.emit('obtain', this.selectedGame))
        join.on('pointerdown', () => this.events.emit('join', { contextId: this.selectedGame, token: this.gameToken }))

        setInterval(() => this.events.emit('refresh'), 500)

        const pane = this.scene.add.graphics({ fillStyle: { color: '#ccc' } })
        pane.fillRect(20, 20, 790, 130)

        this.statusText = this.scene.add.text(20, 155, 'Waiting to select server...')

        for (let i = 0; i < 6; i++) {
            const serverRecord = this.scene.add.text(20, 20 + (i * 20), '').setInteractive()
            serverRecord.on('pointerdown', () => {
                for (let record of this.serverList) {
                    record.setStyle({
                        backgroundColor: '#000000'
                    })
                }
                serverRecord.setStyle({
                    backgroundColor: '#7cb342'
                })
                this.selectedGame = serverRecord.text
                this.statusText.setText('obtain token for selected game before join')
            })
            this.serverList.push(serverRecord)
        }
    }

    setServers(servers = []) {
        const no = Math.min(servers.length, 6)
        for (let i = 0; i < no; i++) {
            this.serverList[i].setText(servers[i].id)
        }
    }

    setToken(token) {
        this.statusText.setText('Press join...')
        this.gameToken = token
    }

}

export default ServerList