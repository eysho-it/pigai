import BaseBindClass from './binds/base-bind-class.js';
import NodeLlamaCppV2 from './binds/node-llama-cpp/node-llama-cpp-v2/node-llama-cpp-v2.js';
export declare const ALL_BINDS: (typeof NodeLlamaCppV2)[];
export declare function getCacheBindClass(): BaseBindClass<unknown> | null;
export default function createChat(): Promise<import("./chat-context.js").ChatContext>;
