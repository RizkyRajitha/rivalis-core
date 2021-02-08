import { v4 as uuid } from 'uuid'

class Message {

    /**
     * 
     * @type {string}
     */
    uid = null

    /**
     * 
     * @type {string}
     */
    type = null

    /**
     * 
     * @type {Array.<number>}
     */
    time = []

    /**
     * 
     * @type {Object.<string, number>}
     */
    clock = null

    /**
     * 
     * @type {string}
     */
    sender = null

    /**
     * 
     * @type {any}
     */
    data = null

    /**
     * 
     * @param {Message} message 
     */
    constructor(message = {}) {
        const { type, time, clock, sender, data } = message
        this.uid = uuid()
        this.type = typeof type === 'string' ? type : this.type
        this.time = Array.isArray(time) ? time : this.time
        this.clock = typeof clock === 'object' ? clock : this.clock
        this.sender = typeof sender === 'string' ? sender : this.sender
        this.data = typeof data !== 'undefined' ? data : this.data
    }

}

/**
 * 
 * @param {Message} message 
 */
Message.getPing = message => {
    const [ t1, t2, , t4, t5 = new Date().getTime() ] = message.time
    return t5 - t1 - (t4 - t2)
}

Message.getProcessingTime = message => {
    const [ , t2, t3 ] = message.time
    return t3 - t2
}

export default Message