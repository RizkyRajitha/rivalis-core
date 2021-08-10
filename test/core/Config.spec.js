import { expect } from "chai"
import Config from "../../src/core/Config"
import Exception from "../../src/core/Exception"
import AuthResolver from "../../src/interfaces/AuthResolver"
import LogReporter from "../../src/interfaces/LogReporter"
import Persistence from "../../src/interfaces/Persistence"

describe('core/Config', () => {

    it('should initialize properly', () => {
        let config = new Config()
        expect(config.auth).to.be.eq(null)
        expect(config.reporters).to.be.deep.eq([])
    })

    it('should auth be validated properly', () => {
        
        let config = new Config({ 
            auth: new AuthResolver(),
            persistence: new Persistence(),
            reporters: [ new LogReporter() ],
            transports: [ ]

        })

        Config.validate(config)

        
    })

})