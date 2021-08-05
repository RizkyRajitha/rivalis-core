class SimpleAuth extends interfaces.AuthResolver {
    
    onAuth(ticket, node) {
        node.logger.info('test')
    }

}

export default SimpleAuth