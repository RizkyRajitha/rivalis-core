import { Router } from 'express'
import { Rivalis } from '../../../src'

const router = Router()


/**
 * 
 * @param {Rivalis} rivalis 
 */
const contextRoutes = rivalis => {

    router.get('/', (request, response) => {
        rivalis.contexts.getAll().then(contextList => {
            response.status(200).json(contextList)
        }).catch(error => {
            response.status(500).json({ message: error.message })
        })
    })


    router.post('/', (request, response) => {
        rivalis.contexts.create({
            data: request.body
        }).then(contextInfo => {
            response.status(200).json(contextInfo)
        }).catch(error => {
            response.status(500).json({ message: error.message })
        })
    })

    router.delete('/:id', (request, response) => {
        rivalis.contexts.delete(request.params.id).then(() => {
            response.status(200).json({})
        }).catch(error => {
            response.status(500).json({ message: error.message })
        })
    })

    router.post('/:id/:actorId', (request, response) => {
        rivalis.slots.obtain(request.params.id, request.params.actorId).then(slot => {
            response.status(200).json(slot)
        }).catch(error => {
            response.status(500).json({ message: error.message })
        })
    })

    return router
}

export default contextRoutes