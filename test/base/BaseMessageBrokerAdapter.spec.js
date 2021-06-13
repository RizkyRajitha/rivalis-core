import { expect } from 'chai'
import BaseMessageBrokerAdapter from '../../src/base/BaseMessageBrokerAdapter'

// eslint-disable-next-line no-undef
describe('base/BaseMessageBrokerAdapter', () => {

    /**
     * 
     * @type {BaseMessageBrokerAdapter}
     */
    let adapter = null

    // eslint-disable-next-line no-undef
    beforeEach((done) => {
        adapter = new BaseMessageBrokerAdapter()
        adapter.initialize().then(() => {
            done()
        })
    })

    // eslint-disable-next-line no-undef
    it('subcribe to an channel, publish message to that channel', () => {
        adapter.subscribe('namespace', 'address', (message) => {
            expect(message).to.be.eq('test')
        })
        adapter.publish('namespace', 'address', 'test')
    })

})