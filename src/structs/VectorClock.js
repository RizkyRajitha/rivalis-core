class VectorClock {

    /**
     * unique identifier of the node
     * @readonly
     * @type {string}
     */
    nodeId = null

    /**
     * clock data
     * @private
     * @type {Object.<string, number>}
     */
    data = {}

    /**
     * @license {@link https://github.com/rivalis/rivalis-core/blob/main/LICENSE}
     * @author Daniel Kalevski
     * @since 0.5.0
     * 
     * Vector Clock implementation used for synchronization of the events
     * 
     * @param {string} nodeId unique identifier of the node
     * @param {Object.<string, number>} data clock data
     */
    constructor(nodeId, data = {}) {
        this.nodeId = nodeId
        this.data = data
    }

    /**
     * override vector clock data with a new one
     * @param {Object.<string, number>} object vector clock object that contains versions
     */
    setClock(clock = {}) {
        this.data = clock
    }

    /**
     * returns new object of clock data
     * @returns {Object.<string, number>}
     */
    getClock() {
        return { ...this.data }
    }

    /**
     * override clock version, if nodeId is not provided
     * @param {number} version
     * @param {string} nodeId 
     */
    setVersion(version, nodeId = this.nodeId) {
        this.data[nodeId] = version
    }

    /**
     * returns clock version of provided node, if nodeId is not provided, version of the current vector clock is returned
     * @param {string} nodeId
     * @returns {number}
     */
    getVersion(nodeId = this.nodeId) {
        return this.data[nodeId] || 0
    }

    /**
     * increment version of clock for node that owns the instance
     */
    increment() {
        this.data[this.nodeId] = this.getVersion(this.nodeId) + 1
    }

    /**
     * can be used for updating the vector clock using merge operation between current vector clock and provided one, clock data of the instace is overwritten
     * @param {VectorClock} vectorClock second vector clock used in merge operation
     */
    update(vectorClock) {
        const updated = {}
        for (let nodeId of VectorClock.getNodeIds(this, vectorClock)) {
            updated[nodeId] = Math.max(this.getVersion(nodeId), vectorClock.getVersion(nodeId))
        }
        this.data = updated
    }

    /**
     * returns true if this vector clock is chronically after provided vector clock
     * @param {VectorClock} vectorClock second vector clock for comparation
     * @returns {boolean} 
     */
    isAfter(vectorClock) {
        return VectorClock.isAfter(this, vectorClock)
    }

    /**
     * returns true if vector clock is concurrent with provided vector clock
     * @param {VectorClock} vectorClock
     * @returns {boolean} 
     */
    isConcurrent(vectorClock) {
        return VectorClock.isConcurrent(this, vectorClock)
    }

    /**
     * returns true if instance is before passed vector clock instance
     * @param {VectorClock} vectorClock 
     */
    isBefore(vectorClock) {
        return VectorClock.isBefore(this, vectorClock)
    }
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {Array.<string>} 
 */
VectorClock.getNodeIds = (vectorClock1, vectorClock2) => {
    const map = { ...vectorClock1.getClock(), ...vectorClock2.getClock() }
    return Object.keys(map)
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {boolean} 
 */
VectorClock.isAfter = (vectorClock1, vectorClock2) => {
    let isAfter = true
    for (let nodeId of VectorClock.getNodeIds(vectorClock1, vectorClock2)) {
        if (vectorClock1.getVersion(nodeId) < vectorClock2.getVersion(nodeId)) {
            isAfter = false
        }
    }
    return isAfter
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2 
 */
VectorClock.isConcurrent = (vectorClock1, vectorClock2) => {
    return !(VectorClock.isAfter(vectorClock1, vectorClock2) || VectorClock.isAfter(vectorClock2, vectorClock1))
}


/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2 
 */
VectorClock.isBefore = (vectorClock1, vectorClock2) => {
    return !VectorClock.isAfter(vectorClock1, vectorClock2) && !VectorClock.isConcurrent(vectorClock1, vectorClock2)
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {number} 
 */
VectorClock.compare = (vectorClock1, vectorClock2) => {
    if (VectorClock.isAfter(vectorClock1, vectorClock2)) {
        return 1
    } else if (VectorClock.isConcurrent(vectorClock1, vectorClock2)) {
        return 0
    } else {
        return -1
    }
}

export default VectorClock