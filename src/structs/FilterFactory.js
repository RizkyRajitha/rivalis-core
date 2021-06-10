/**
 * @typedef FilterFacts
 * @property {boolean} all
 * @property {Array.<string>} include
 * @property {Array.<string>} exclude
 */

class FilterFactory {


    /**
     * 
     * @type {FilterFacts}
     * @private
     */
    facts = {
        all: false,
        include: [],
        exclude: []
    }

    /**
     * 
     * @returns {FilterFactory}
     */
    all() {
        this.facts.all = true
        return this
    }

    /**
     * 
     * @param  {...string} values 
     * @returns {FilterFactory}
     */
    include(...values) {
        this.facts.include.push(...values)
        return this
    }

    /**
     * 
     * @param  {...string} values 
     * @returns {FilterFactory}
     */
    exclude(...values) {
        this.facts.exclude.push(...values)
        return this
    }

    /**
     * 
     * @returns {string}
     */
    get() {
        let all = this.facts.all ? '1' : '0'
        let include = this.facts.include.join(',')
        let exclude = this.facts.exclude.join(',')
        return `${all};${include};${exclude}`
    }

    /**
     * 
     * @param {string} filter 
     * @returns {FilterFacts}
     */
    toFacts(filter) {
        let [ all, include, exclude ] = filter.split(';')
        all = all === '1' ? true : false
        include = include.split(',')
        exclude = exclude.split(',')
        return { all, include, exclude }
    }

    /**
     * 
     * @param {FilterFacts} facts 
     * @param {string} value 
     * @returns {boolean}
     */
    isApplicable(facts, value) {
        
    }

    /**
     * 
     * 
     */
    reset() {
        this.facts.all = false
        this.facts.include = []
        this.facts.exclude = []
        return this
    }

}

export default FilterFactory

let instance = null
FilterFactory.getInstance = () => {
    if (instance === null) {
        instance = new FilterFactory()
    }
    return instance
}