import { v4 as uuid } from 'uuid'

/**
 * 
 * @returns {string}
 */
export const generateID = () => {
    return uuid()
}