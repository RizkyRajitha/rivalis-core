class ActionModule {

    core = null

    constructor(core) {
        this.core = core
    }

    execute(actor, key, data) {
        // let actionHandler = Activity.getHandler(this.core.context.activity, key)
        // if (actionHandler === null) {
        //     return Promise.reject(new Error(`there is no action handler for key=(${key})`))
        // }
        // actionHandler(actor, key, data, this.engine.context)
        // // TODO: error handling
    }

}

export default ActionModule