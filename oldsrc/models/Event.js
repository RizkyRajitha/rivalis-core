class Event {
    
    receiver = null

    type = null

    data = null

    constructor(type, data, receiver = null) {
        this.type = type
        this.data = data
        this.receiver = receiver
    }
}

export default Event