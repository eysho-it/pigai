import { WebSocket } from "ws";
import { ChatContext } from "../../../manage-models/bind-class/chat-context.js";
export default class WsChatController {
    protected ws: WebSocket;
    private _loadChat?;
    constructor(ws: WebSocket);
    init(): Promise<void>;
    protected get _chat(): ChatContext;
    private _initEvents;
    private _onWSMessage;
    private _sendEvent;
}
