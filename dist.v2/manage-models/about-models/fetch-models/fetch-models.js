import wretch from 'wretch';
import ENV_CONFIG from '../../../storage/config.js';
import AppDb from '../../../storage/app-db.js';
import { CLIPullProgress, pullFileCLI } from 'ipull';
import path from 'path';
import fs from 'fs-extra';
import { pathToFileURL } from 'url';
import findBestModelBinding from '../best-model-binding.js';
import ConnectChunksProgress from './connect-chunks-progress.js';
import objectAssignDeep from 'object-assign-deep';
const DEFAULT_DOWNLOAD_TYPE = 'model';
export const DEFAULT_VERSION = 0;
export default class FetchModels {
    options;
    static _cachedModels;
    _downloadFiles = {};
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
    constructor(options) {
        this.options = options;
    }
    async _findModel() {
        if (typeof this.options.download === 'object' && 'files' in this.options.download) {
            this._downloadFiles = this.options.download.files;
            return;
        }
        if (this.options.download instanceof Array) {
            this.options.tag ??= FetchModels._findModelTag(this.options.download[0]);
            this._downloadFiles = {
                model: this.options.download
            };
            return;
        }
        if (this.options.download.startsWith('http://') || this.options.download.startsWith('https://')) {
            const [firstFiles, ...otherFiles] = this.options.download.split(',');
            this.options.tag ??= FetchModels._findModelTag(firstFiles);
            this._downloadFiles = {
                model: [firstFiles, ...otherFiles]
            };
            return;
        }
        await this._setDetailedRemoteModel();
    }
    async _setDetailedRemoteModel() {
        const models = await FetchModels.fetchModels();
        const modelName = this.options.download.toString().toLocaleLowerCase();
        const foundModel = Object.keys(models).find(x => x === modelName);
        if (!foundModel)
            return this._setDetailedLocalModel();
        const { download: modelDownloadDetails, ...model } = models[foundModel];
        const branch = this.options.latest ? modelDownloadDetails.branch : modelDownloadDetails.commit;
        const downloadLinks = Object.fromEntries(Object.entries(modelDownloadDetails.files)
            .map(([tag, files]) => [tag, [files].flat().map(file => `${modelDownloadDetails.repo}/resolve/${branch}/${file}`)]));
        this.options.tag = foundModel;
        this.options.model = objectAssignDeep(this.options.model ?? {}, model);
        this._downloadFiles = downloadLinks;
    }
    async _setDetailedLocalModel() {
        const fullPath = path.resolve(this.options.download.toString());
        console.log(fullPath);
        if (typeof this.options.download !== 'string' || !await fs.pathExists(fullPath))
            throw new Error(`Cannot find model ${this.options.download}`);
        this.options.tag ??= FetchModels._findModelTag(fullPath);
        this._downloadFiles = {
            model: pathToFileURL(fullPath).href
        };
    }
    async _deleteOldFiles() {
        const modelDetails = AppDb.db.models[this.options.tag];
        if (!modelDetails)
            return;
        for (const fileId in modelDetails.downloadedFiles) {
            const filePath = modelDetails.downloadedFiles[fileId];
            await fs.remove(filePath);
        }
        delete AppDb.db.models[this.options.tag];
        await AppDb.saveDB();
    }
    async startDownload() {
        await this._findModel();
        await this._deleteOldFiles();
        const createDownloadName = (type) => type === DEFAULT_DOWNLOAD_TYPE ? this.options.tag : `${this.options.tag}.${type}`;
        const downloadedFiles = {};
        for (const [type, urls] of Object.entries(this._downloadFiles)) {
            const savePath = path.join(ENV_CONFIG.MODEL_DIR, createDownloadName(type));
            await FetchModels._downloadModelInFiles([urls].flat(), savePath, type);
            downloadedFiles[type] = savePath;
        }
        const settings = this.options.model?.settings ?? {};
        settings.bind ??= findBestModelBinding(downloadedFiles);
        AppDb.db.models[this.options.tag] = {
            ...this.options.model,
            downloadedFiles,
            settings,
            defaultSettings: settings,
            createDate: Date.now(),
        };
        await AppDb.saveDB();
    }
    static async fetchModels() {
        if (this._cachedModels)
            return this._cachedModels;
        try {
            new URL(ENV_CONFIG.MODEL_INDEX);
            return this._cachedModels = await wretch(ENV_CONFIG.MODEL_INDEX).get().json();
        }
        pigch {
            return this._cachedModels = await fs.readJSON(ENV_CONFIG.MODEL_INDEX);
        }
    }
    static async _downloadModelInFiles(urls, savePath, type) {
        if (urls.length === 1) {
            await pullFileCLI(urls[0], savePath, type);
            return;
        }
        const allParts = [];
        for (const [index, url] of Object.entries(urls)) {
            const partPath = `${savePath}.${index}`;
            allParts.push(partPath);
            await pullFileCLI(url, partPath, `${type} ${Number(index) + 1}/${urls.length}`);
        }
        const progress = new ConnectChunksProgress(allParts, savePath);
        await progress.init();
        await new CLIPullProgress(progress, 'Connecting chunks').startPull();
    }
    static _findModelTag(modelPath) {
        return modelPath.split(/[\/\\]/).pop();
    }
}
//# sourceMappingURL=fetch-models.js.map