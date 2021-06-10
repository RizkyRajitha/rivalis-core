import { expect } from 'chai'
import Activity from '../../src/context/Activity'

describe('context/Activity', () => {

    it('should register action', (done) => {
        let activity = new Activity()
        activity.on('example', (action, context) => {
            expect(action).to.be.eq('pass')
            done()
        })
        let listener = Activity.getListener(activity, 'example')
        listener('pass')
    })

    it('should register child activity', (done) => {
        let activity = new Activity()
        activity.on('example', (action, context) => {
            expect(action).to.be.eq('pass')
            done()
        })
        let parentActivity = new Activity()
        parentActivity.use('child', activity)

        let listener = Activity.getListener(parentActivity, 'child.example')
        listener('pass')
    })

})