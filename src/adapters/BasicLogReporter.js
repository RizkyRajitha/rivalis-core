import LogReporter from '../interfaces/LogReporter'

class BasicLogReporter extends LogReporter {

    async init() {}

    async dispose() {}

    log(level, namespace, message) {
        let time = new Date().toISOString()
        console.log(`[${level}][${time}][${namespace}]: ${message}`)
    }

}

export default BasicLogReporter