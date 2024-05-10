import { ModelSettings } from '../../../storage/app-db.js';
export type DetailedDownloadInfo = {
    files: {
        [fileId: string]: string | string[];
    };
    repo: string;
    commit: string;
    branch: string;
};
export type FetchOptions = {
    download: string | string[] | DetailedDownloadInfo;
    tag?: string;
    latest?: boolean;
    model?: Partial<ModelSettings<any>>;
};
export declare const DEFAULT_VERSION = 0;
export default class FetchModels {
    options: FetchOptions;
    private static _cachedModels;
    private _downloadFiles;
    /**
     * Install a model from a remote source
     *
     * @example - Install from a direct link (can be multiple links)
     * const install = await new FetchModels({
     *   download: 'https://huggingface.co/TheBloke/Megamix-A1-13B-GGUF/resolve/main/megamix-a1-13b.Q2_K.gguf'
     * });
     *
     * await install.startDownload();
     *
     * @example - Install form PigAI model index
     * const models = await FetchModels.fetchModels();
     * const firstModel = Object.keys(models)[0];
     *
     * const install = await new FetchModels({
     *  download: firstModel
     * });
     *
     * await install.startDownload();
     */
    constructor(options: FetchOptions);
    private _findModel;
    private _setDetailedRemoteModel;
    private _setDetailedLocalModel;
    private _deleteOldFiles;
    startDownload(): Promise<void>;
    static fetchModels(): Promise<any>;
    private static _downloadModelInFiles;
    private static _findModelTag;
}
