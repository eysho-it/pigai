import { App } from "@tinyhttp/app";
import { WebSocket } from "ws";
export declare const chatRouter: App<any, import("@tinyhttp/app").Request, import("@tinyhttp/app").Response<any, any>>;
export declare function connectWS(ws: WebSocket): Promise<void>;
