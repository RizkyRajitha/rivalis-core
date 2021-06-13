import { expect } from 'chai'
import BaseMessageBrokerAdapter from '../../src/base/BaseMessageBrokerAdapter'
import BaseSharedStorageAdapter from '../../src/base/BaseSharedStorageAdapter'
import BaseLoggingAdapter from '../../src/base/BaseLoggingAdapter'
import Activity from '../../src/context/Activity'
import Context from '../../src/context/Context'
import Actor from '../../src/context/Actor'

const handleEvent = (event, actor, context) => {
    console.log(event, actor, context)
}

/**
 * 
 * @param {Context} context 
 */
const setup = (context) => {
    /** @type {Object.<string,Actor>} */
    let actors = {
        A: null,
        B: null
    }
    context.actors.join('playerA', { team: 'A' }).then(actorA => {
        actors.A = actorA
        return context.actors.join('playerB', { team: 'B' })
    }).then(actorB => {
        actors.B = actorB
    }).then(() => {
        actors.A.addListener(event => handleEvent(event, actors.A, context))
        actors.B.addListener(event => handleEvent(event, actors.B, context))
    }).then(() => {
        actors.A.execute('action.test', 'here I am')
    })
}


// eslint-disable-next-line no-undef
describe('context/Context', () => {

    // eslint-disable-next-line no-undef
    it('test', (done) => {
        
        let activity = new Activity()
        let actions = new Activity()
        activity.use('action', actions)
        actions.on('test', (actor, data, context) => {
            
        })

        let messageBrokerAdapter = new BaseMessageBrokerAdapter()
        messageBrokerAdapter.initialize()
        let sharedStorageAdapter = new BaseSharedStorageAdapter()
        sharedStorageAdapter.initialize()
        let loggingAdapter = new BaseLoggingAdapter()
        loggingAdapter.initialize()
        
        let context = new Context('test', activity, messageBrokerAdapter, sharedStorageAdapter, loggingAdapter)
        context.initialize().then(() => {
            setup(context)
            setTimeout(() => {
                expect('test').to.be.eq('test')
                done()
            }, 1000)
        })
    })

})