import type { ConversationInteraction, LlamaModelOptions } from 'node-llama-cpp';
import NodeLlamaCppChat from './node-llama-cpp-chat.js';
import BaseBindClass from '../../base-bind-class.js';
type NodeLlamaCppOptions = Omit<LlamaModelOptions, 'modelPath'> & {
    wrapper?: string;
    maxTokens?: number;
    printLLamaSystemInfo?: boolean;
    systemPrompt?: string;
    conversationHistory?: readonly ConversationInteraction[];
};
export default class NodeLlamaCppV2 extends BaseBindClass<NodeLlamaCppOptions> {
    static shortName: string;
    static description: string;
    private _model?;
    private _package?;
    createChat(): NodeLlamaCppChat;
    initialize(): Promise<void>;
}
export {};
