import Event from './Event'
import Config from './Config'
import Context from './Context'
import Exception from './Exception'
import Logger from './Logger'
import Stage from './Stage'

class Room extends Context {

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
        this.logger.trace(`room id=(${this.id}) type=(${this.type}) options=(${JSON.stringify(this.options)}) initialized!`)
    }

    /**
     * @returns {Promise.<void>}
     */
    async dispose() {
        await super.dispose()
        this.logger.trace('disposed!')
    }

    /**
     * 
     * @param {Actor} actor 
     * @param {string} key 
     * @param {any} data 
     */
    async execute(actor, key, payload) {
        let exist = this.actors.list.includes(actor)
        if (!exist) {
            throw new Exception(`[room] execution failed, actor=(${JSON.stringify(actor)}) doesn't exist!`)
        }
        let handler = Stage.getHandler(this.stage, key)
        if (handler === null) {
            throw new Exception(`[room] execution failed, handler for action key=(${key}) doesn't exist!`)
        }
        this.logger.debug(`action executed key=(${key}) payload=(${JSON.stringify(payload)}) by actor id=(${actor.id})`)
        try {
            await handler(actor, key, payload, this)
        } catch (error) {
            this.logger.warning(`action execution failed, key=(${key}) data=(${JSON.stringify(payload)}) executed by actor id=(${actor.id}) reason:`, error.message)
        }
    }

    /**
     * @private
     * @param {Event} event 
     */
    handleEvent(event) {
        super.handleEvent(event)
        this.logger.debug(`emitted event key=(${event.key}) data=(${event.data}) sender=(${event.sender})`)
        let filter = Stage.getFilter(this.stage, event.key)
        this.actors.list.forEach(async actor => {
            let filterPass = true
            if (filter !== null) {
                let value = await filter(actor, event, this)
                if (typeof filterPass === 'boolean') {
                    filterPass = value
                } else {
                    this.logger.warning(`filter key=(${event.key}) returns non boolean value`)
                }
            }
            if (filterPass) {
                this.logger.trace(`event key=(${event.key}) data=(${event.data}) sender=(${event.sender}) sent to ${actor.id}`)
                actor.emit.event(event)
            } else {
                this.logger.trace(`event key=(${event.key}) data=(${event.data}) sender=(${event.sender}) filtered for ${actor.id}`)
            }
        })        
    }

}

export default Room