import { v4 as uuid } from 'uuid'

const generateID = () => {
    return uuid().split('-').join('')
}

export default generateID