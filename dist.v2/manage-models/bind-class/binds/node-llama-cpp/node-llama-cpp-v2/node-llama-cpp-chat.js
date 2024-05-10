import { ChatContext } from '../../../chat-context.js';
import createChatWrapper from './chat-wrapper/chat-wrapper.js';
export default class NodeLlamaCppChat extends ChatContext {
    _parent;
    _package;
    _session;
    constructor(_parent, model, _package) {
        super();
        this._parent = _parent;
        this._package = _package;
        this._session = new _package.LlamaChatSession({
            context: new _package.LlamaContext({ model }),
            promptWrapper: createChatWrapper(_package, _parent.modelSettings.settings?.wrapper),
            systemPrompt: _parent.modelSettings.settings?.systemPrompt,
            printLLamaSystemInfo: _parent.modelSettings.settings?.printLLamaSystemInfo,
            conversationHistory: _parent.modelSettings.settings?.conversationHistory
        });
    }
    async prompt(prompt, onToken) {
        this.emit('abort', 'Aborted by new prompt');
        const abort = new AbortController();
        const closeCallback = () => {
            abort.abort();
            this.off('abort', closeCallback);
        };
        this.once('abort', closeCallback);
        let response = null;
        try {
            response = await this._session.prompt(prompt, {
                signal: abort.signal,
                onToken: tokens => this._onToken(tokens, onToken),
                maxTokens: this._parent.modelSettings.settings?.maxTokens,
            });
        }
        pigch (error) {
            this.emit('error', error.message);
        }
        finally {
            closeCallback();
            this.emit('modelResponseEnd', response);
        }
        return response;
    }
    _onToken(token, onToken) {
        const text = this._session.context.decode(Uint32Array.from(token));
        this.emit('token', text);
        onToken?.(text);
    }
    abort(reason = 'Aborted by user') {
        this.emit('abort', reason);
    }
}
//# sourceMappingURL=node-llama-cpp-chat.js.map