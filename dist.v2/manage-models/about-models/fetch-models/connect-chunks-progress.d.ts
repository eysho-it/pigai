import { IStreamProgress } from 'ipull';
export default class ConnectChunksProgress implements IStreamProgress {
    private _files;
    private _toFile;
    private static _UPDATE_TIME_MS;
    private _progress?;
    /**
     * Connects chunks into one file, removes chunks after that and reports progress
     */
    constructor(_files: string[], _toFile: string);
    init(): Promise<void>;
    progress(callback: (progressBytes: number, totalBytes: number) => void): Promise<any>;
}
