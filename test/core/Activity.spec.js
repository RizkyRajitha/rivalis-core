import { expect } from 'chai'
import Activity from '../../src/core/Activity'

// eslint-disable-next-line no-undef
describe('context/Activity', () => {

    // eslint-disable-next-line no-undef
    it('should register an action', (done) => {
        let activity = new Activity()
        activity.handle('example', (action, actor, context) => {
            expect(action).to.be.eq('pass')
            done()
        })
        let listener = Activity.getHandler(activity, 'example')
        listener('pass')
    })

    // eslint-disable-next-line no-undef
    it('should register a filter', (done) => {
        let activity = new Activity()
        activity.filter('example', (event, context) => {
            expect(event).to.be.eq('pass')
            done()
        })
        let listener = Activity.getFilter(activity, 'example')
        listener('pass')
    })

    // eslint-disable-next-line no-undef
    it('should register child activity with action handler', (done) => {
        let activity = new Activity()
        activity.handle('example', (action, context) => {
            expect(action).to.be.eq('pass')
            done()
        })
        let parentActivity = new Activity()
        parentActivity.use('child', activity)

        let listener = Activity.getHandler(parentActivity, 'child.example')
        listener('pass')
    })

    // eslint-disable-next-line no-undef
    it('should register child activity with filter handler', (done) => {
        let activity = new Activity()

        activity.filter('example', (event) => {
            expect(event).to.be.eq('pass')
            done()
        })
        let parentActivity = new Activity()
        parentActivity.use('child', activity)
        let filter = Activity.getFilter(parentActivity, 'child.example')
        filter('pass')
    })

})