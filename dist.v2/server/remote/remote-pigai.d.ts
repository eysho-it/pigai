/// <reference types="node" resolution-mode="require"/>
import { ClientOptions } from 'ws';
import { ClientRequestArgs } from 'http';
import { ChatContext } from '../../manage-models/bind-class/chat-context.js';
export default class RemotePigAI extends ChatContext {
    private _ws;
    private _closed;
    private _promiseOpen?;
    /**
     * Connect to remote PigAI server, and use it as a chat context
     * @param url - WebSocket URL
     * @param options - WebSocket options
     */
    constructor(url: string, options?: ClientRequestArgs | ClientOptions);
    private _init;
    private _onMessage;
    private _send;
    abort(reason?: string): void;
    prompt(prompt: string, onToken?: (token: string) => void): Promise<string | null>;
    close(): void;
    [Symbol.dispose](): void;
}
