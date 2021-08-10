import Config from '../core/Config'
import Exception from '../core/Exception'
import Logger from '../core/Logger'
import Node from '../core/Node'
import Room from '../core/Room'
import Stage from '../core/Stage'
import RoomEntry from '../models/RoomEntry'
import SharedStorage from '../persistence/SharedStorage'
import Broadcaster from '../structs/Broadcaster'
import Codec from '../structs/Codec'
import { isInstanceOf } from '../utils/helpers'

class RoomProvider extends Broadcaster {


    /**
     * @private
     * @type {Map.<string,Room>}
     */
    rooms = null

    /**
     * @private
     * @type {Map.<string,Stage>}
     */
    stages = null

    /**
     * @private
     * @type {Logger}
     */
    logger = null

    /**
     * @private
     * @type {SharedStorage.<RoomEntry>}
     */
    storage = null

    /**
     * @private
     * @type {Config}
     */
    config = null

    /**
     * 
     * @param {Node} node 
     */
    constructor(node) {
        super()
        this.config = node.config
        this.rooms = new Map()
        this.stages = new Map()
        this.logger = node.logging.getLogger('rooms')
        let codec = new Codec(['id', 'type', 'options'], RoomEntry)
        this.storage = new SharedStorage(this.config.persistence, 'rivalis-rooms', codec) 
    }

    /**
     * 
     * @param {string} type 
     * @param {Stage} stage 
     */
    define(type, stage) {
        if (!isInstanceOf(stage, Stage)) {
            throw new Exception('stage must implements Stage')
        }
        // TODO: check type
        this.stages.set(type, stage)
        this.logger.info(`stage of type=(${type}) is defined`)
        this.emit('define', type)
    }

    /**
     * 
     * @param {string} id 
     * @param {string} type 
     * @param {Object.<string,any>} options 
     * @returns {Promise.<RoomEntry>}
     */
    async create(id, type, options = {}) {
        // TODO: validate id & options
        if (!this.stages.has(type)) {
            throw new Exception(`[rooms] room creation failed, room type=(${type}) is not defined`)
        }
        let data = new RoomEntry({ id, type, options })
        let persisted = await this.storage.savenx(id, data)
        if (!persisted) {
            throw new Exception(`[rooms] room creation failed, room id=(${id}) already exist!`)
        }
        this.logger.info(`room id=(${id}) of type=(${type}) is created!`)
        return data
    }

    async obtain(id) {
        // TODO: validate id
        if (this.rooms.has(id)) {
            return this.rooms.get(id)
        }
        let roomEntry = await this.storage.get(id)
        if (roomEntry === null) {
            throw new Exception(`[rooms] room creation failed, room id=(${id}) doesen't exist!`)
        }
        let room = new Room(id, this.config)
        await room.init()
        this.rooms.set(id, room)
        this.logger.info(`room id=(${id}) has became alive!`)
        return room
    }

    async omit(id) {
        // TODO: validate id
        if (!this.rooms.has(id)) {
            throw new Exception(`[rooms] room omit failed, room id=(${id}) is not obtained`)
        }
        let room = this.rooms.get(id)
        await room.dispose()
        this.logger.info(`room id=(${id}) was disposed!`)
        this.rooms.delete(id)
    }

    async getAll() {
        let list = []
        let rooms = await this.storage.getAll()
        rooms.forEach(room => list.push(room))
        return list
    }

    get list() {
        let list = []
        this.rooms.forEach(room => list.push(room))
        return list
    }

    destroy() {

    }

}

export default RoomProvider