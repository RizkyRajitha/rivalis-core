const MODE = {
    STRICT,
    OPEN
}

export { MODE }

class ContextOptions {

    /**
     * 
     * @type {Array.<string>}
     */
    actionHandlers = []

    /**
     * 
     */
    mode = MODE.STRICT

    /**
     * 
     */
    maxAgents = 2

    /**
     * 
     */
    agentIdentifiers = []

}

export default ContextOptions