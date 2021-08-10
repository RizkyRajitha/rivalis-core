import { expect } from 'chai'
import Codec from '../../src/structs/Codec'

class A {

    test1 = null
    test2 = null
    
    constructor(data) {
        this.test1 = data.test1
        this.test2 = data.test2
    }
}

describe('core/Config', () => {

    it('should encode/decode object properly', () => {
        let codec = new Codec(['test1', 'test2'])
        let data = { test1: 'example', test2: 'examp1e' }
        let encoded = codec.encode(data)
        expect(encoded).to.be.deep.eq(['example', 'examp1e'])
        let decoded = codec.decode(encoded)
        expect(decoded).to.be.deep.eq(data)
    })

    it('should encode/decode class properly', () => {
        let codec = new Codec(['test1', 'test2'], A)
        let data = new A({ test1: 'example', test2: 'examp1e' })
        let encoded = codec.encode(data)
        expect(encoded).to.be.deep.eq(['example', 'examp1e'])
        let decoded = codec.decode(encoded)
        expect(decoded).to.be.deep.eq(data)
        expect(decoded).to.be.instanceOf(A)
    })

})