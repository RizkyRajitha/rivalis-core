class RoomEntry {

    /**
     * @readonly
     * @type {string}
     */
    id = null

    /**
     * @readonly
     * @type {string}
     */
    type = null

    /**
     * @readonly
     * @type {Object.<string,any>}
     */
    options = {}

    /**
     * 
     * @param {RoomEntry} data 
     */
    constructor(data) {
        this.id = data.id
        this.type = data.type
        this.options = data.options
    }

}

export default RoomEntry