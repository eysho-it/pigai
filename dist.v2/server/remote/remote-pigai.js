import WebSocket from 'ws';
import { ChatContext } from '../../manage-models/bind-class/chat-context.js';
export default class RemotePigAI extends ChatContext {
    _ws;
    _closed = false;
    _promiseOpen;
    /**
     * Connect to remote PigAI server, and use it as a chat context
     * @param url - WebSocket URL
     * @param options - WebSocket options
     */
    constructor(url, options) {
        super();
        this._ws = new WebSocket(url, options);
        this._init();
    }
    _init() {
        this._ws.on('message', this._onMessage.bind(this));
        this._ws.on('error', (message) => {
            this.emit('error', message.message);
        });
        this._ws.on('close', (code) => {
            if (this._closed)
                return;
            this.emit('error', 'Connection closed: ' + code);
        });
        this._ws.on('open', () => {
            this.emit("open");
        });
        this._promiseOpen = new Promise((resolve, reject) => {
            this.once('open', resolve);
            this.once('error', reject);
        });
    }
    _onMessage(message) {
        const { event, value } = JSON.parse(message);
        switch (event) {
            case 'token':
                this.emit('token', value);
                break;
            case 'error':
                this.emit('error', value);
                break;
            case 'abort':
                this.emit('abort', value);
                break;
            case 'end':
                this.emit('modelResponseEnd', value);
                break;
        }
    }
    _send(event, value) {
        this._ws.send(JSON.stringify({ event, value }));
    }
    abort(reason) {
        this._send('abort', reason || 'Aborted by user');
    }
    async prompt(prompt, onToken) {
        await this._promiseOpen;
        this._send('prompt', prompt);
        let buildText = '';
        const tokenEvent = (token) => {
            buildText += token;
            onToken?.(token);
        };
        this.on('token', tokenEvent);
        return await new Promise((resolve, reject) => {
            this.once('error', reject);
            this.once('modelResponseEnd', () => {
                this.off('token', tokenEvent);
                this.off('error', reject);
                resolve(buildText);
            });
        });
    }
    close() {
        this._closed = true;
        this._ws.close();
    }
    [Symbol.dispose]() {
        this.close();
    }
}
//# sourceMappingURL=remote-pigai.js.map