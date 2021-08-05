import { expect } from 'chai'
import Exception from '../../src/core/Exception'
import InMemoryPersistence from '../../src/core/InMemoryPersistence'

const delay = (ms = 0) => new Promise(resolve => setTimeout(() => resolve(), ms))

describe('core/InMemoryPersistence', () => {
    
    

    it('should init properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
    })

    it('should dispose properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        await persistence.dispose()
        try {
            await persistence.get('namespace', 'test')
        } catch (error) {
            expect(error).to.be.instanceOf(Exception)
        }
    })

    it('should set / get properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        await persistence.set('namespace', 'testkey', 'myvalue')
        let value = await persistence.get('namespace', 'testkey')
        expect(value).to.be.eq('myvalue')
    })

    it('should setnx properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        let saved = await persistence.setnx('namespace', 'testkey', 'myvalue')
        expect(saved).to.be.true
        let value = await persistence.get('namespace', 'testkey')
        expect(value).to.be.eq('myvalue')
        let persisted = await persistence.setnx('namespace', 'testkey', 'myothervalue')
        expect(persisted).to.be.false
    })

    it('should expire / ttl properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        await persistence.set('namespace', 'mykey', 'value')
        await persistence.expire('namespace', 'mykey', 130)
        let ttl = await persistence.ttl('namespace', 'mykey')
        expect(ttl).to.be.lte(ttl)
        let value = await persistence.get('namespace', 'mykey')
        expect(value).to.be.eq('value')
        await delay(130)
        value = await persistence.get('namespace', 'mykey')
        expect(value).to.be.eq(null)
    })

    it('should getset properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        let value = await persistence.getset('namespace', 'test', 'value1')
        expect(value).to.be.eq(null)
        value = await persistence.getset('namespace', 'test', 'value2')
        expect(value).to.be.eq('value1')
        value = await persistence.get('namespace', 'test')
        expect(value).to.be.eq('value2')
    })

    it('should getset properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        await persistence.getset('namespace', 'test', 'value1')
        let exist = await persistence.exist('namespace', 'test')
        expect(exist).to.be.true
        await persistence.delete('namespace', 'test')
        exist = await persistence.exist('namespace', 'test')
        expect(exist).to.be.false
    })

    it('should fetch keys properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        let keys = await persistence.keys('namespace')
        expect(keys).to.be.deep.eq([])
        await persistence.set('namespace', 'test', 'value1')
        keys = await persistence.keys('namespace')
        expect(keys).to.be.deep.eq(['test'])
    })

    it('should incrby / decrby properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        await persistence.set('namespace', 'number', '1')
        await persistence.incrby('namespace', 'number', 1)
        let value = await persistence.get('namespace', 'number')
        expect(value).to.be.eq('2')
        await persistence.decrby('namespace', 'number', 2)
        value = await persistence.get('namespace', 'number')
        expect(value).to.be.eq('0')
    })

    it('should clear namespace properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        await persistence.set('namespace', 'number', '1')
        await persistence.set('namespace', 'number2', '2')
        await persistence.clear('namespace')
        let value = await persistence.get('namespace', 'number')
        expect(value).to.be.null
        value = await persistence.get('namespace', 'number2')
        expect(value).to.be.null
    })

    it('should clear namespace properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        await persistence.set('namespace', 'number', '1')
        await persistence.set('namespace', 'number2', '2')
        await persistence.clear('namespace')
        let value = await persistence.get('namespace', 'number')
        expect(value).to.be.null
    })

    it('should push / pop properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        let length = await persistence.lpush('namespace', 'list', 'first')
        expect(length).to.be.eq(1)
        length = await persistence.rpush('namespace', 'list', 'second')
        expect(length).to.be.eq(2)
        length = await persistence.lpush('namespace', 'list', 'third')
        expect(length).to.be.eq(3)
        let value = await persistence.rpop('namespace', 'list')
        expect(value).to.be.eq('second')
        value = await persistence.lpop('namespace', 'list')
        expect(value).to.be.eq('third')
        length = await persistence.length('namespace', 'list')
        expect(length).to.be.eq(1)
    })

    it('should rpoplpush properly', async () => {
        let persistence = new InMemoryPersistence()
        await persistence.init()
        for (let i = 0; i < 10; i++) {
            await persistence.lpush('namespace', 'list', `item-${i}`)
        }
        let value = await persistence.rpoplpush('namespace', 'list', 'list2')
        expect(value).to.be.eq('item-0')
        value = await persistence.lpop('namespace', 'list2')
        expect(value).to.be.eq('item-0')
        value = await persistence.length('namespace', 'list')
        expect(value).to.be.eq(9)
    })

    it('should pub / sub properly', (done) => {
        let persistence = new InMemoryPersistence()
        persistence.init()

        persistence.subscribe('namespace', 'address', message => {
            expect(message).to.be.eq('test')
            done()
        })
        persistence.publish('namespace', 'address', 'test')
    })

})
