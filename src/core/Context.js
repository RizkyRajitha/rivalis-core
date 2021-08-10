import DataProvider from "../providers/DataProvider"

class Context {

    /**
     * @type {DataProvider}
     */
    data = null

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    init() {

    }

    /**
     * @protected
     * @returns {Promise.<void>}
     */
    dispose() {

    }

}

export default Context