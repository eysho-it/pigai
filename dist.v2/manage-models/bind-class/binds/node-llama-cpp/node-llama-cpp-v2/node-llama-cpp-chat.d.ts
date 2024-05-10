import { ChatContext } from '../../../chat-context.js';
import type NodeLlamaCpp from './node-llama-cpp-v2.js';
import type { LlamaModel } from 'node-llama-cpp';
export default class NodeLlamaCppChat extends ChatContext {
    protected _parent: NodeLlamaCpp;
    private _package;
    private _session;
    constructor(_parent: NodeLlamaCpp, model: LlamaModel, _package: typeof import('node-llama-cpp'));
    prompt(prompt: string, onToken?: (token: string) => void): Promise<string | null>;
    private _onToken;
    abort(reason?: string): void;
}
