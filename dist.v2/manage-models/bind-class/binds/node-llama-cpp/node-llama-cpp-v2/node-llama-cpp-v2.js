import NodeLlamaCppChat from './node-llama-cpp-chat.js';
import BaseBindClass from '../../base-bind-class.js';
export default class NodeLlamaCppV2 extends BaseBindClass {
    static shortName = 'node-llama-cpp-v2';
    static description = 'node-llama-cpp v2, that support GGUF model, and advanced feature such as output format, max tokens and much more';
    _model;
    _package;
    createChat() {
        return new NodeLlamaCppChat(this, this._model, this._package);
    }
    async initialize() {
        const { LlamaModel, ...others } = await import('node-llama-cpp');
        this._package = others;
        this._model = new LlamaModel({
            modelPath: this.modelSettings.downloadedFiles.model,
            ...this.modelSettings.settings
        });
    }
}
//# sourceMappingURL=node-llama-cpp-v2.js.map