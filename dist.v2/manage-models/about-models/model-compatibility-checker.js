import chalk from 'chalk';
import * as os from 'os';
import FetchModels, { DEFAULT_VERSION } from './fetch-models/fetch-models.js';
import AppDb from '../../storage/app-db.js';
import { packageJSON } from '../../storage/config.js';
import semver from 'semver';
const GB_IN_BYTES = 1024 * 1024 * 1024;
class ModelCompatibilityChecker {
    static availableCpuCors = os.cpus().length;
    static totalMemoryInGB = os.totalmem() / GB_IN_BYTES;
    static availableMemory = os.freemem() / GB_IN_BYTES;
    static checkModelCompatibility({ hardwareCompatibility, compatiblePigAIVersionRange }) {
        if (!compatiblePigAIVersionRange?.[0]) {
            return {
                compatibility: '?',
                note: 'Model unknown'
            };
        }
        if (semver.gt(compatiblePigAIVersionRange[0], packageJSON.version)) {
            return {
                compatibility: '❌',
                note: `requires at least PigAI version ${chalk.cyan(compatiblePigAIVersionRange[0])}`
            };
        }
        if (compatiblePigAIVersionRange[1] && semver.lt(compatiblePigAIVersionRange[1], packageJSON.version)) {
            return {
                compatibility: '❌',
                note: `requires PigAI version ${chalk.cyan(compatiblePigAIVersionRange[1])} or lower`
            };
        }
        if (!hardwareCompatibility) {
            return {
                compatibility: '?',
                note: 'Model unknown'
            };
        }
        const { ramGB: memory, cpuCors: cpu } = hardwareCompatibility;
        if (this.totalMemoryInGB < memory) {
            return {
                compatibility: '❌',
                note: `requires at least ${chalk.cyan(`${memory}GB`)} of RAM`
            };
        }
        else if (this.availableCpuCors < cpu) {
            return {
                compatibility: '❌',
                note: `requires at least ${chalk.cyan(`${cpu}CPU`)} cores`
            };
        }
        else if (this.availableMemory < memory) {
            return {
                compatibility: '✅',
                note: `requires ${chalk.cyan(`${memory}GB`)} ${chalk.red(`free`)} RAM`
            };
        }
        else {
            return {
                compatibility: '✅',
                note: ''
            };
        }
    }
    static modelVersion(model, models) {
        const installedVersion = AppDb.db.models[model]?.version || DEFAULT_VERSION;
        const remoteVersion = models[model]?.version || DEFAULT_VERSION;
        if (!models[model] || installedVersion === remoteVersion) {
            return chalk.green(`v${installedVersion} = v${remoteVersion}`);
        }
        if (installedVersion < remoteVersion) {
            return `${chalk.yellow('v' + installedVersion)} < ${chalk.green('v' + remoteVersion)}`;
        }
        return `${chalk.cyan('v' + installedVersion)} > ${chalk.green('v' + remoteVersion)}`;
    }
    static async listAllModels() {
        const models = [];
        const availableModels = await FetchModels.fetchModels();
        for (const model in availableModels) {
            if (availableModels[model].hide)
                continue;
            const modelInstalled = Boolean(AppDb.db.models[model]);
            const { compatibility, note } = this.checkModelCompatibility(availableModels[model]);
            const version = this.modelVersion(model, availableModels);
            models.push({
                model,
                modelInstalled,
                compatibility,
                note,
                version
            });
        }
        return models;
    }
}
export default ModelCompatibilityChecker;
//# sourceMappingURL=model-compatibility-checker.js.map