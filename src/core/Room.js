import Event from './Event'
import ActorProvider from '../providers/ActorProvider'
import Config from './Config'
import Context from './Context'
import Exception from './Exception'
import Logger from './Logger'
import Stage from './Stage'

class Room extends Context {

    
    /**
     * @readonly
     * @type {ActorProvider}
     */
    actors = null

    /**
     * 
     * @param {string} id 
     * @param {string} type 
     * @param {string} options 
     * @param {Config} config 
     * @param {Stage} stage
     * @param {Logger} logger
     */
    constructor(id, type, options, config, stage, logger) {
        super(id, type, options, config, stage, logger)
    }

    /**
     * @returns {Promise.<void>}
     */
    async init() {
        await super.init()
        this.actors = new ActorProvider(this.config, this, this.logger)
        this.logger.trace(`room id=(${this.id}) type=(${this.type}) options=(${JSON.stringify(this.options)}) initialized!`)
    }

    /**
     * @returns {Promise.<void>}
     */
    async dispose() {
        await super.dispose()
        this.logger.trace('disposed!')
    }

    async execute(actor, key, data) {
        let exist = this.actors.list.includes(actor)
        if (!exist) {
            throw new Exception(`[room] execution failed, actor=(${JSON.stringify(actor)}) doesn't exist!`)
        }
        let handler = Stage.getHandler(this.stage, key)
        if (handler === null) {
            throw new Exception(`[room] execution failed, handler for action key=(${key}) doesn't exist!`)
        }
        this.logger.debug(`action executed key=(${key}) data=(${JSON.stringify(data)}) by actor id=(${actor.id})`)
        return handler(actor, key, data, this)
    }

    /**
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        super.handleEvent(event)
        this.logger.debug('emitted event:', event)
        let filter = Stage.getFilter(this.stage, event.key)
        this.actors.list.forEach(actor => {
            if (filter === null) {
                actor.send(event.key, event.data, event.sender)
            } else {
                filter(actor, event, this)
            }
        })        
    }

}

export default Room