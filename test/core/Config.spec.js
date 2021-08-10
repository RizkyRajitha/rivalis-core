import { expect } from 'chai'
import Config from '../../src/core/Config'

describe('core/Config', () => {

    it('example', () => {
        let config = new Config()
        expect(config).to.be.not.null
    })

})