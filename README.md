# apexprotoc.js
A simple library for Apex Legends LiveAPI 2.0 using [protobufjs](https://www.npmjs.com/package/protobufjs).

`apexprotoc.js` connects to your Apex Legends LiveAPI stream allowing you to receive and listen to Live API Events in the form of javascript objects and send requests to your Apex client.


# Install
```
npm install @spiider./apexprotoc.js
```

For this package to work, you need to enable LiveAPI for Apex Legends by configuring the game's launch options:

```
+cl_liveapi_enabled 1 +cl_liveapi_ws_servers "ws://127.0.0.1:{PORT}"
```

# Usage example

```js
const apexprotoc = require('@spiider./apexprotoc.js');

const Server = new apexprotoc.Server();

Server.on('gameStateChanged', (gameStateData) => {
    if (gameStateData.state === "playing") {
        Server.send('CustomMatch_SendChat', { text: "glhf!" })
    }
})

Server.once('connection', async () => {
    console.log('Server connected with Apex client!')

    await Server.send('CustomMatch_CreateLobby', {})

    const LobbyPlayersData = await ApexServer.get('CustomMatch_GetLobbyPlayers')
    console.log(`Lobby code is: ${LobbyPlayersData.playerToken}`)
});

Server.listen(7777);
```