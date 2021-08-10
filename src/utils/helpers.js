
/**
 * 
 * @param {Function} Class 
 * @returns {Array.<string>}
 */
export const getListOfMethods = (Class) => {
    return Object.getOwnPropertyNames(Class.prototype).filter(property => property !== 'constructor')
}

/**
 * 
 * @param {object} instance 
 * @param {Function} Class 
 * @returns 
 */
export const isInstanceOf = (instance, Class) => {
    if (typeof instance !== 'object') {
        return false
    }

    let methods = getListOfMethods(Class)
    for (let method of methods) {
        if (typeof instance[method] !== 'function') {
            return false
        }
    }
    return true
}

/**
 * 
 * @param {any} property
 * @param {boolean} mandatory  
 * @param {string} type
 */
export const isPropertyValid = (property = null, type, isMandatory = false,) => {
    if (!isMandatory && property === null) {
        return true
    }

    if (typeof property === type) {
        return true
    }
    return false
}