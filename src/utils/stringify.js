/**
 * 
 * @param {any} unit 
 * @returns {string}
 */
const stringify = (unit) => {
    if (typeof unit === 'string') {
        return unit
    } else if (typeof unit === 'function') {
        try {
            return unit.prototype.constructor.toString()
        } catch (error) {
            try {
                return unit.toString()
            } catch (error) {
                return ''
            }
        }
    } else if (typeof unit === 'undefined') {
        return 'undefined'
    } else if (typeof unit === 'object') {
        let cache = new Map()
        let data = JSON.stringify(unit, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.has(value)) {
                    return
                }
                cache.set(value, 0)
            }
            return value
        })
        cache.clear()
        cache = null
        return data
    } else {
        return JSON.stringify(unit)
    }
}

export default stringify