export default function createChatWrapper(_package, wrapper = null) {
    switch (wrapper) {
        case 'llamaChat':
            return new _package.LlamaChatPromptWrapper();
        case 'chatML':
            return new _package.ChatMLPromptWrapper();
        case 'falconChat':
            return new _package.FalconChatPromptWrapper();
        case null:
            return new _package.GeneralChatPromptWrapper();
    }
    throw new Error(`Unknown chat wrapper: ${wrapper}`);
}
//# sourceMappingURL=chat-wrapper.js.map