import createChat from "../../../manage-models/bind-class/bind-class.js";
export default class WsChatController {
    ws;
    _loadChat;
    constructor(ws) {
        this.ws = ws;
    }
    async init() {
        this._loadChat = await createChat();
        this._initEvents();
    }
    get _chat() {
        if (!this._loadChat)
            throw new Error('Chat not loaded');
        return this._loadChat;
    }
    _initEvents() {
        this.ws.on("message", this._onWSMessage.bind(this));
        this.ws.on("close", this._chat.abort.bind(this._chat));
        this._chat.on('modelResponseEnd', () => {
            this._sendEvent('end', null);
        });
        this._chat.on('error', (error) => {
            this._sendEvent('error', error);
        });
        this._chat.on('token', (text) => {
            process.stdout.write(text);
            this._sendEvent('token', text);
        });
    }
    async _onWSMessage(message) {
        const { event, value } = JSON.parse(message);
        switch (event) {
            case 'prompt':
                await this._chat.prompt(value);
                break;
            case 'abort':
                await this._chat.abort();
                break;
        }
    }
    _sendEvent(event, value) {
        this.ws.send(JSON.stringify({ event, value }));
    }
}
//# sourceMappingURL=ws-chat.js.map