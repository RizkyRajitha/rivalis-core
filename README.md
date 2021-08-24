# Rivalis Core

[![logo](https://user-images.githubusercontent.com/10467454/113154097-f834d280-9237-11eb-95a9-bd62cdde4677.png)](https://rivalis.io)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://rivalis.io)
[![forthebadge](https://forthebadge.com/images/badges/fo-real.svg)](https://rivalis.io)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://rivalis.io)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://rivalis.io)


[![GitHub](https://img.shields.io/github/license/kalevski/rivalis-core?style=for-the-badge)](https://github.com/rivalis/rivalis-core/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/workflow/status/rivalis/rivalis-core/release?style=for-the-badge)](https://github.com/rivalis/rivalis-core/actions/workflows/release.yml)
[![GitHub Release)](https://img.shields.io/github/v/tag/rivalis/rivalis-core?color=orange&include_prereleases&label=VERSION&style=for-the-badge)](https://www.npmjs.com/package/@rivalis/core)
[![npm downloads](https://img.shields.io/npm/dw/@rivalis/core?label=downloads&style=for-the-badge)](https://www.npmjs.com/package/@rivalis/core)
[![Read docs](https://img.shields.io/badge/READ-DOCS-green?style=for-the-badge)](https://rivalis.io/docs)
[![Visit website](https://img.shields.io/badge/Official-Website-blue?style=for-the-badge)](https://rivalis.io)
[![Discord](https://img.shields.io/discord/793996342934372384?style=for-the-badge&logo=discord)](https://discord.gg/bdtRHVkm5b)

---

Rivalis is open source framework for building multiplayer game servers.
- **Extensible** - Rivalis can work with multiple protocols at same time.
- **Scalable** - Rivalis provides interfaces for integration with any external databases and services
- **Easy to use** - Rivalis provides extensible & well designed API, read more about that in the [documentation](https://rivalis.io/docs)

---

## Getting Started

### Prerequisites
- JavaScript & NodeJS knowledge
- NodeJS (14.17.+) installed on your local machine
- Code Editor

### New Project

- Create empty npm project using `npm init` in empty directory
- Install rivalis-core library using `npm i --save @rivalis/core`
- Install rivalis websocket protocol library using `npm i --save @rivalis/protocol-websocket`
- Create simple entrypoint for your project like:

**server.js**
```js

const http = require('http')
const { Node, AuthResolver } = require('@rivalis/core')
const { WebSocketProtocol } = require('@rivalis/protocol-websocket')

// http server is used only for websocket protocol
const server = http.createServer()

// AuthResolver is the place where you need to implement your authentication/authorization logic.
class CustomAuthLogic extends AuthResolver {
    async onAuth(ticket, node) {
        // --- EXAMPLE (IMPLEMENT YOUR LOGIC HERE) ---
        let { roomId, actorId, data } = this.getFromTicket(ticket)
        let room = await node.rooms.obtain(roomId)
        return room.actors.join(actorId, data)
    }
}

const webSocketProtocol = new WebSocketProtocol({ server })
const rivalis = new Node({
    transports: [ webSocketProtocol ]
})
rivalis.run()
server.listen(2345)

```

Follow the official [documentation](https://rivalis.io/docs).

**Let's begin with hacking!**


## License

The project is licensed under [MIT License](https://github.com/rivalis/rivalis-core/blob/main/LICENSE)

