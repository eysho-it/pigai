/// <reference types="node" resolution-mode="require"/>
import http from 'http';
export default function openServer(server: http.Server): Promise<void>;
