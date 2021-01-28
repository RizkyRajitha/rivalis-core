import { Rivalis } from '../../src'

const gameserver = new Rivalis({

})

gameserver.initialize().then(() => {

})

gameserver.stages.define('test', new TestStage())