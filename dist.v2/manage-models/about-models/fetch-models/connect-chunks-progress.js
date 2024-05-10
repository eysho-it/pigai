import fs from 'fs-extra';
import progress from 'progress-stream';
import MultiStream from 'multistream';
export default class ConnectChunksProgress {
    _files;
    _toFile;
    static _UPDATE_TIME_MS = 100;
    _progress;
    /**
     * Connects chunks into one file, removes chunks after that and reports progress
     */
    constructor(_files, _toFile) {
        this._files = _files;
        this._toFile = _toFile;
    }
    async init() {
        let totalSize = 0;
        for (const file of this._files) {
            const stat = await fs.stat(file);
            totalSize += stat.size;
        }
        this._progress = progress({
            length: totalSize,
            time: ConnectChunksProgress._UPDATE_TIME_MS
        });
    }
    async progress(callback) {
        if (this._progress == null)
            throw new Error('Progress is not initialized');
        this._progress.on('progress', (progress) => {
            callback(progress.transferred, progress.length);
        });
        await fs.remove(this._toFile);
        const toFileSteam = fs.createWriteStream(this._toFile);
        const stream = new MultiStream(this._files.map(fromPath => fs.createReadStream(fromPath)));
        stream.pipe(this._progress).pipe(toFileSteam);
        return new Promise((resolve, reject) => {
            stream.once('finish', () => {
                this._files.forEach(fs.remove);
                resolve(null);
            });
            stream.once('error', reject);
        });
    }
}
//# sourceMappingURL=connect-chunks-progress.js.map