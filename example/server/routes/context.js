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
        })
    })


    router.post('/', (request, response) => {
        rivalis.contexts.create({
            data: request.body
        }).then(contextInfo => {
            response.status(200).json(contextInfo)
        })
    })

    router.delete('/:id', (request, response) => {
        rivalis.contexts.delete(request.params.id).then(() => {
            response.status(200).json({})
        })
    })

    router.post('/:id/:agentId', (request, response) => {
        rivalis.contexts.obtainSlot(request.params.id, request.params.agentId).then(token => {
            response.status(200).json({
                token
            })
        })
    })

    return router
}

export default contextRoutes