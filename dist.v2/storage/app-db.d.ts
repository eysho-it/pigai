export type ModelInnerSettings<T> = T & {
    bind: string;
    key?: string;
};
export type ModelSettings<T> = {
    downloadedFiles: {
        [fileId: string]: string;
    };
    version?: number;
    compatiblePigAIVersionRange?: [string, string?];
    hardwareCompatibility?: {
        "ramGB": number;
        "cpuCors": number;
        "compressions": number;
    };
    settings: ModelInnerSettings<T>;
    defaultSettings: ModelInnerSettings<T>;
    createDate: number;
};
export type DBStore = {
    activeModel?: string;
    installedPigAIVersion?: string;
    models: {
        [modelName: string]: ModelSettings<{
            [settingName: string]: any;
        }>;
    };
};
export declare class PigAIJsonDB {
    private readonly DB_PATH;
    db: DBStore;
    constructor();
    loadDB(): Promise<void>;
    saveDB(): Promise<void>;
}
declare const appDB: PigAIJsonDB;
export default appDB;
