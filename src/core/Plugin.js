import Clock from '../structs/Clock'
import Node from './Node'

class Plugin {

    /**
     * 
     * @param {Node} node 
     * @param {Clock} clock 
     */
    async init(node, clock) {}

    async dispose() {}


}

export default Plugin