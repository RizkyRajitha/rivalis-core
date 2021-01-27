import { expect } from 'chai'
import VectorClock from '../../src/core/VectorClock'

describe('Vector clock tests', () => {
    
    const nodeOneId = 'test-node-1',
        nodeTwoId = 'test-node-2',
        nodeThreeId = 'test-node-3'

    let nodeOneClock = null,
        nodeTwoClock = null,
        nodeThreeClock = null

    beforeEach(() => {
        nodeOneClock = {}
        nodeTwoClock = {}
        nodeThreeClock = {}

        nodeOneClock[nodeOneId] = 1
        nodeOneClock[nodeTwoId] = 0
        nodeOneClock[nodeThreeId] = 0

        nodeTwoClock[nodeOneId] = 0
        nodeTwoClock[nodeTwoId] = 1
        nodeTwoClock[nodeThreeId] = 0

        nodeThreeClock[nodeOneId] = 0
        nodeThreeClock[nodeTwoId] = 0
        nodeThreeClock[nodeThreeId] = 1
    })

    it('should initialize properly', () => {
        const vectorClock = new VectorClock(nodeOneId, nodeOneClock)
        expect(vectorClock.nodeId).to.be.equal(nodeOneId)
        expect(vectorClock.getClock()).to.be.deep.equal(nodeOneClock)

    })

    it('should set clock values properly', () => {
        const vectorClock = new VectorClock(nodeOneId, nodeOneClock)
        vectorClock.setClock(nodeTwoClock)
        expect(vectorClock.getClock()).to.be.deep.equal(nodeTwoClock)
    })

    it('should set version value properly', () => {
        const vectorClock = new VectorClock(nodeOneId, nodeOneClock)
        vectorClock.setVersion(5)
        expect(vectorClock.getVersion()).to.be.equal(5)
    })

    it('should increment value properly', () => {
        const vectorClock = new VectorClock(nodeOneId, nodeOneClock)
        vectorClock.increment()
        expect(vectorClock.getVersion()).to.be.equal(2)
    })

    it('should update values properly', () => {
        const updatedClock = {}
        updatedClock[nodeOneId] = 1
        updatedClock[nodeTwoId] = 1
        updatedClock[nodeThreeId] = 1
        
        const vectorClock1 = new VectorClock(nodeOneId, nodeOneClock)
        const vectorClock2 = new VectorClock(nodeTwoId, nodeTwoClock)
        const vectorClock3 = new VectorClock(nodeThreeId, nodeThreeClock)
        vectorClock1.update(vectorClock2)
        vectorClock1.update(vectorClock3)
        
        expect(vectorClock1.getClock()).to.be.deep.equal(updatedClock)
    })

    it('should VectorClock#getNodeIds returns list of all node ids of two nodes', () => {
        const vectorClock1 = new VectorClock(nodeOneId)
        vectorClock1.increment()
        
        const vectorClock2 = new VectorClock(nodeTwoId)
        vectorClock2.increment()
        
        const nodeIdList = VectorClock.getNodeIds(vectorClock1, vectorClock2)
        
        expect(nodeIdList).to.be.instanceof(Array)
        expect(nodeIdList).to.be.eql([ nodeOneId, nodeTwoId ])
    })

    it('should VectorClock#isAfter returns valid order', () => {
        const vectorClock1 = new VectorClock(nodeOneId, nodeOneClock)
        const vectorClock2 = new VectorClock(nodeTwoId, nodeTwoClock)
        
        vectorClock1.update(vectorClock2)
        vectorClock1.increment()
        
        const isAfter = VectorClock.isAfter(vectorClock1, vectorClock2)
        
        expect(isAfter).to.be.true
    })

    it('should VectorClock#isConcurrent returns valid order', () => {
        const vectorClock1 = new VectorClock(nodeOneId, nodeOneClock)
        const vectorClock2 = new VectorClock(nodeTwoId, nodeTwoClock)
        
        vectorClock1.increment()
        
        const isConcurrent = VectorClock.isConcurrent(vectorClock1, vectorClock2)
        
        expect(isConcurrent).to.be.true
    })

    it('should VectorClock#isBefore returns valid order', () => {
        const vectorClock1 = new VectorClock(nodeOneId, nodeOneClock)
        const vectorClock2 = new VectorClock(nodeTwoId, nodeTwoClock)

        vectorClock2.update(vectorClock1)
        vectorClock2.increment()
        
        const isBefore = VectorClock.isBefore(vectorClock1, vectorClock2)
        expect(isBefore).to.be.true
    })

    it('should VectorClock#compare returns valid order', () => {
        const vectorClock1 = new VectorClock(nodeOneId, nodeOneClock)
        const vectorClock2 = new VectorClock(nodeTwoId, nodeTwoClock)
        const vectorClock3 = new VectorClock(nodeThreeId, nodeThreeClock)

        // node one receives the messages from vc2 & vc3 and increment
        vectorClock1.update(vectorClock2)
        vectorClock1.update(vectorClock3)
        vectorClock1.increment()

        // node three receives the messages from vc1 and increment
        vectorClock3.update(vectorClock1)
        vectorClock3.increment()

        const order = [vectorClock1, vectorClock2, vectorClock3].sort(VectorClock.compare)
        const orderIds = order.map(vectorClock => vectorClock.nodeId)

        expect(orderIds).to.be.eql([nodeTwoId, nodeOneId, nodeThreeId])
        expect(vectorClock1.isAfter(vectorClock2)).to.be.true
        expect(vectorClock3.isAfter(vectorClock1)).to.be.true
        expect(vectorClock3.isAfter(vectorClock2)).to.be.true
    })
})