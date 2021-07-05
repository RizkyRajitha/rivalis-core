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

---

Rivalis is open source framework for building multiplayer game servers.
- **Extensible** - Rivalis can work with multiple protocols at same time.
- **Scalable** - Rivalis provides interfaces for integration with any external services
- **Partial event ordering** - Rivalis has built-in implementation for partial event ordering using [Vector Clock](https://en.wikipedia.org/wiki/Vector_clock) data structure
- **Easy to use** - Rivalis provides extensible & well designed API, read more about that in the [documentation](https://rivalis.io/docs)

---

## Getting Started

### Prerequisites
- JavaScript & NodeJS knowledge
- NodeJS installed on your local machine
- Code Editor

### New Project

- Create empty npm project using `npm init` in empty directory
- Install rivalis-core library using `npm i --save @rivalis/core`
- Install rivalis websocket protocol library using `npm i --save @rivalis/protocol-websocket`
- Install inMemory adapter using `npm i --save @rivalis/adapter-inmemory`
- Create simple entrypoint for your project like:

**server.js**
```js

const http = require('http')
const { Logger, Rivalis, AuthResolver } = require('@rivalis/core')
const { InMemoryAdapter } = require('@rivalis/adapter-inmemory')
const { WebSocketProtocol } = require('@rivalis/protocol-websocket')

// http server is used only for websocket protocol
const server = http.createServer()

// AuthResolver is the place where you need to implement your authentication/authorization logic.
class CustomAuthLogic extends AuthResolver {
    onAuth(ticket) {
        // --- YOUR AUTH LOGIC HERE ---
        return { contextId, authorId, data }
    }
}

const rivalis = new Rivalis(new InMemoryAdapter(), new CustomAuthLogic())

rivalis.initialize()

```

Follow the official [documentation](https://rivalis.io/docs).

**Let's begin with hacking!**


## License

The project is licensed under [MIT License](https://github.com/rivalis/rivalis-core/blob/main/LICENSE)

