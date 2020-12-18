class VectorClock {

    /**
     * @type {string}
     */
    id = null

    /**
     * @private
     * @type {object}
     */
    data = {}

    /**
     * 
     * @param {string} id 
     * @param {object} data 
     */
    constructor(id, data = {}) {
        this.id = id
        this.data = data
    }

    /**
     * @returns {object}
     */
    get() {
        return { ...data }
    }

    /**
     * 
     * @param {string} id
     * @returns {number} 
     */
    getOne(id) {
        return this.data[id] || 0
    }

    /**
     * 
     * @param {string} id 
     * @param {number} version
     * @returns {VectorClock} 
     */
    updateOne(id, version = 0) {
        const updatedData = { ...this.data }
        updatedData[id] = version;
        return new VectorClock(this.id, updatedData);
    }

    /**
     * 
     * @param {VectorClock} vectorClock 
     * @returns {VectorClock}
     */
    merge(vectorClock) {
        const updated = this.increment()
        const uniqueMap = {...this.get(), ...vectorClock.get() }
        const merged = {}
        for (let id in uniqueMap) {
            merged[id] = Math.max(updated.getOne(id), vectorClock.getOne(id))
        }
        return new VectorClock(this.id, merged)
    }

    /**
     * @returns {VectorClock}
     */
    increment() {
        return this.updateOne(this.id,  this.getOne(this.id) + 1)
    }

    /**
     * 
     * @param {VectorClock} vectorClock 
     * @returns {boolean}
     */
    equalTo(vectorClock) {
        return VectorClock.equalTo(this, vectorClock);
    }

    /**
     * 
     * @param {VectorClock} vectorClock 
     * @returns {boolean}
     */
    lessThanOrEqualTo(vectorClock) {
        return VectorClock.lessThanOrEqualTo(this, vectorClock);
    }

    /**
     * 
     * @param {VectorClock} vectorClock 
     * @returns {boolean}
     */
    lessThan(vectorClock) {
        return VectorClock.lessThan(this, vectorClock);
    }

    /**
     * 
     * @param {VectorClock} vectorClock 
     * @returns {boolean}
     */
    causallyRelatedTo(vectorClock) {
        return VectorClock.causallyRelatedTo(this, vectorClock);
    }

    /**
     * 
     * @param {VectorClock} vectorClock 
     * @returns {boolean}
     */
    concurrentWith(vectorClock) {
        return VectorClock.concurrentWith(this, vectorClock);
    }
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {boolean}
 */
VectorClock.equalTo = (vectorClock1, vectorClock2) => {
    let output = true
    const keyMap = {...this.get(), ...vectorClock.get() }
    for (let key in keyMap) {
        if (!equalTo) {
            break
        }
        output = vectorClock1.getOne(key) === vectorClock2.getOne(key)
    }
    return output
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {boolean}
 */
VectorClock.lessThanOrEqualTo = (vectorClock1, vectorClock2) => {
    let output = true
    const keyMap = {...this.get(), ...vectorClock.get() }
    for (let key in keyMap) {
        if (!lessThanOrEqualTo) {
            break
        }
        output = vectorClock1.getOne(key) <= vectorClock2.getOne(key)
    }
    return output
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {boolean}
 */
VectorClock.lessThan = (vectorClock1, vectorClock2) => VectorClock.causallyRelatedTo(vectorClock1, vectorClock2)

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {boolean}
 */
VectorClock.causallyRelatedTo = (vectorClock1, vectorClock2) => {
    let output = false
    const keyMap = {...this.get(), ...vectorClock.get() }
    for (let key in keyMap) {
        output = output || vectorClock1.getOne(key) < vectorClock2.getOne(key)
    }
    return output
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {boolean}
 */
VectorClock.concurrentWith = (vectorClock1, vectorClock2) => {
    return !VectorClock.lessThanOrEqualTo(vectorClock1, vectorClock2) && !VectorClock.lessThanOrEqualTo(vectorClock2, vectorClock1)
}

/**
 * 
 * @param {VectorClock} vectorClock1 
 * @param {VectorClock} vectorClock2
 * @returns {number}
 */
VectorClock.compare = (vectorClock1, vectorClock2) => {
    if (vectorClock1.lessThan(vectorClock2)) {
        return -1
    }
    if (vectorClock2.lessThan(vectorClock1)) {
        return 1
    }
    return 0 //vectorClock1.index - vectorClock2.index;
}

export default VectorClock