import { expect } from 'chai'
import { Event } from '../../src'
import Codec from '../../src/structs/Codec'

describe('structs/Codec', () => {

    it('should encode/decode event properly', () => {
        let codec = Codec.getInstance()
        let event = new Event({ test: 1 }, 'test').set('example', 'testdata')
        let encoded = codec.events.encode(event)
        let decoded = codec.events.decode(encoded)
        expect(event).to.be.deep.eq(decoded)
    })
})