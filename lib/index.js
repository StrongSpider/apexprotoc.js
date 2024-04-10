const { EventEmitter } = require('events');
const protobuf = require("protobufjs");
const WebSocket = require('ws');
const path = require('path');

const GetReponses = [
    'CustomMatch_LobbyPlayers',
    'CustomMatch_SetSettings'
];

class Server {
    constructor() {
        this._event = new EventEmitter();
        this._lastTypeURL = "";
        this._lastProto = null;
        this._closed = true;

        this.wss = new WebSocket.Server({ noServer: true });
        this.ws = null;
    }

    get isClosed() {
        return this._closed;
    }

    on(eventName, listener) {
        this._event.on(eventName, listener);
    }

    async once(eventName, listener) {
        const self = this;
        return new Promise(function (resolve) {
            self._event.once(eventName, function (e) {
                if (listener) listener(e);
                resolve(e);
            })
        })
    }

    async listen(port = 7777) {
        try {
            const root = await protobuf.load(path.join(__dirname, '../events.proto'));
            this.wss = new WebSocket.Server({ port: port });
            this._event.emit('start', true);

            this.wss.on('connection', (socket) => {
                this.ws = socket;

                this._event.emit('connection', true);
                this._closed = false;
                socket.on('message', (message) => {
                    const LiveAPIEvent = root.lookupType('LiveAPIEvent');
                    const LiveAPIEventMessage = LiveAPIEvent.decode(message);

                    const GameMessage = root.lookupType(LiveAPIEventMessage.gameMessage.typeUrl.slice(20));
                    const GameMessageData = GameMessage.decode(LiveAPIEventMessage.gameMessage.value);

                    this._event.emit('liveAPIEvent', GameMessageData);

                    if (GameMessage.name === 'Response') {
                        let response = {};
                        response.success = GameMessageData.success;

                        // Silly Billy edge case with GET method
                        for (let index = 0; index < GetReponses.length; index++) {
                            const type = GetReponses[index];
                            if (this._lastTypeURL == `type.googleapis.com/rtech.liveapi.${type}`) {
                                response.message = this._lastProto;
                            }
                        }
                        
                        if (GameMessageData.result) {
                            const result = GameMessageData.result;

                            const ResponseMessage = root.lookupType(result.typeUrl.slice(20));
                            const ResponseMessageData = ResponseMessage.decode(result.value);

                            response.message = ResponseMessageData;
                        }

                        this._event.emit('response', response);
                    } else {
                        this._event.emit(GameMessage.name.charAt(0).toLowerCase() + GameMessage.name.slice(1), GameMessageData);
                    }

                    this._lastTypeURL = LiveAPIEventMessage.gameMessage.typeUrl;
                    this._lastProto = GameMessageData;
                });

                socket.on('close', () => {
                    this._closed = true;
                    this._event.emit('disconnect', true);
                });
            });
        } catch (error) {
            this.destroy();
            throw error;
        }
    }

    async get(type) {
        this.send(type);
        const response = await this.once('response');
        return response.message;
    }

    async send(type, message) {
        const root = await protobuf.load(path.join(__dirname, '../events.proto'));

        let RequestParams = {
            withAck: true
        }

        const protoMessage = root.lookupType(type).create(message);
        RequestParams[type.charAt(0).toLowerCase() + type.slice(1)] = protoMessage;

        const Request = root.lookupType('Request');
        const RequestMessage = Request.create(RequestParams);
        const RequestEncoded = Request.encode(RequestMessage).finish();
        this.ws.send(RequestEncoded);
    }

    async destroy() {
        this._event.removeAllListeners();
        this.wss.removeAllListeners();
        this._closed = true;
    }
}

exports.Server = Server;