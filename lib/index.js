const { EventEmitter } = require('events');
const protobuf = require("protobufjs");
const WebSocket = require('ws');
const path = require('path');

class Server {
    constructor() {
        this._closed = true
        this._event = new EventEmitter()

        this.wss = new WebSocket.Server({ noServer: true })
        this.ws = null
    }

    get isClosed() {
        return this._closed
    }

    on(eventName, listener) {
        this._event.on(eventName, listener)
    }

    async once(eventName, listener) {
        const self = this;
        return new Promise(function (resolve) {
            self._event.once(eventName, function (e) {
                listener(e)
                resolve(e)
            })
        })
    }

    async listen(port) {
        try {
            const root = await protobuf.load(path.join(__dirname, '../events.proto'))
            this.wss = new WebSocket.Server({ port: port });
            this._event.emit('start', true)

            this.wss.on('connection', (socket) => {
                this.ws = socket

                this._event.emit('connection', true)
                this._closed = false
                socket.on('message', (message) => {
                    const LiveAPIEvent = root.lookupType('LiveAPIEvent')
                    const LiveAPIEventMessage = LiveAPIEvent.decode(message)

                    const GameMessage = root.lookupType(LiveAPIEventMessage.gameMessage.typeUrl.slice(20))
                    const GameMessageData = GameMessage.decode(LiveAPIEventMessage.gameMessage.value)

                    if (GameMessage.name === 'Response') {
                        let response = {}
                        response.success = GameMessageData.success

                        if (GameMessageData.result) {
                            const result = GameMessageData.result

                            const ResponseMessage = root.lookupType(result.typeUrl.slice(20))
                            const ResponseMessageData = ResponseMessage.decode(result.value)

                            response.message = ResponseMessageData
                        }

                        this._event.emit('response', response)
                    } else {
                        this._event.emit(GameMessage.name.charAt(0).toLowerCase() + GameMessage.name.slice(1), GameMessageData)
                    }
                });

                socket.on('close', () => {
                    this._closed = true
                    this._event.emit('disconnect', true)
                });
            });
        } catch (error) {
            this.destroy();
            throw error;
        }
    }

    async send(type, message) {
        const root = await protobuf.load(path.join(__dirname, '../events.proto'))

        let RequestParams = {
            withAck: true
        }

        const protoMessage = root.lookupType(type).create(message)
        RequestParams[type.charAt(0).toLowerCase() + type.slice(1)] = root.lookupType(type).encode(protoMessage).finish()

        const Request = root.lookupType('Request')
        this.ws.send(Request.encode(Request.create(RequestParams)).finish())
    }

    async destroy() {
        console.log("AHHH")
        this._event.removeAllListeners()
        this.wss.removeAllListeners()
        this._closed = true
    }
}

exports.Server = Server