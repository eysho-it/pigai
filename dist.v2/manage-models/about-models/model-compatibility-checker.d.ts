import { ModelSettings } from '../../storage/app-db.js';
interface Compatibility {
    compatibility: string;
    note: string;
}
export interface ModelInfo {
    model: string;
    modelInstalled: boolean;
    compatibility: string;
    note: string;
    version: string;
}
export interface AvailableModels {
    [key: string]: ModelSettings<any>;
}
declare class ModelCompatibilityChecker {
    private static readonly availableCpuCors;
    private static readonly totalMemoryInGB;
    private static readonly availableMemory;
    static checkModelCompatibility({ hardwareCompatibility, compatiblePigAIVersionRange }: ModelSettings<any>): Compatibility;
    static modelVersion(model: string, models: AvailableModels): string;
    static listAllModels(): Promise<ModelInfo[]>;
}
export default ModelCompatibilityChecker;
