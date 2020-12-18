import SessionProvider from './providers/SessionProvider'
import AdapterHolder from './adapters/AdapterHolder'

class Rivalis {

    /**
     * @private
     * @type {AdapterHolder}
     */
    adapterHolder = null

    /**
     * @type {SessionProvider}
     */
    sessions = null

    /**
     * 
     * @param {AdapterHolder} adapterHolder 
     */
    constructor(adapterHolder) {
        this.adapterHolder = adapterHolder
        this.sessions = new SessionProvider(this.adapterHolder)
    }
}

export default Rivalis