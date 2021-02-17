import { expect } from 'chai'
import EventEmitter from 'eventemitter3'
import { Signal } from 'signals'
import Client from '../../src/core/Client'

describe('core/Client tests', () => {

    /**
     * @type {Client}
     */
    let client = null

    let onMessage = new Signal()
    let simulateMessage = message => {
        client.handleMessage(message)
    }

    beforeEach(() => {
        onMessage.removeAll()
        client = new Client()
        client.ready()
        client.sendMessage = message => {
            onMessage.dispatch(message)
        }
    })

    it('should initialize properly', () => {
        expect(client).not.be.null
        expect(client.emitter).instanceOf(EventEmitter)
        expect(client.isReady).to.be.true
        expect(client.handleMessage).not.be.null
    })

    it('should validate join method params', () => {
        try {
            client.join()
            client.join(1, '')
            client.join('', 1)
        } catch (error) {
            expect(error).not.be.null
            return
        }
        expect(true).to.be.false
    })

    it('should join', (done) => {
        onMessage.addOnce(message => {
            expect(message).to.be.eq('{"kind":"join","content":{"contextId":"test","actorId":"test","data":{"test":1}}}')
            done()
        })
        client.join('test', 'test', { test: 1 })
    })

})