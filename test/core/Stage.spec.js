import { expect } from 'chai'
import Exception from '../../src/core/Exception'
import Stage from '../../src/core/Stage'

describe('core/Stage', () => {
    
    it('should emit message properly', done => {

        let stage = new Stage()
        stage.on('init', context => {
            expect(context).to.be.eq('test')
            done()
        })
        stage.emit('init', 'test')

    })

    it('should handle error properly', () => {

        let stage = new Stage()
        stage.on('init', context => {
            throw new Exception('test')
        })
        try {
            stage.emit('init', 'test')
            expect(true).to.be.false
        } catch (error) {
            expect(error).to.be.instanceOf(Exception)
        }

    })
})