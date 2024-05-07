import * as path from 'path';
import * as os from 'os';
import yn from 'yn';
import fs from 'fs-extra';
import {fileURLToPath} from 'url';

const __dirname = fileURLToPath(new URL('./', import.meta.url));
export const packageJSON = await fs.readJSON(path.join(__dirname, '..', '..', 'package.json'));

/**
 * pigai config, that can be set by env variables
 * @property {string} pigai_DIR - The directory to store models and other data.
 *
 * env: pigai_DIR
 * @property {boolean} PRODUCTION - Whether to run in production mode
 *
 * env: pigai_PRODUCTION
 * @property {string} SELECTED_UI - The web ui to use
 *
 * env: pigai_SELECTED_UI
 * @property {number} PORT - The port to use for the server
 *
 * env: pigai_PORT
 * @property {boolean} OPEN_IN_BROWSER - Whether to open the website in the browser
 *
 * env: pigai_OPEN_IN_BROWSER
 * @property {boolean} ADMIN_USE - Whether to use admin features
 *
 * env: pigai_ADMIN_USE
 * @property {string} MODEL_INDEX - The url to the model index, currently fetch from pigai repo
 *
 * env: pigai_MODEL_INDEX
 * @property {string} MODEL_DIR - The directory to store models
 *
 * env: pigai_DIR
 * @property {boolean} DEBUG_MODE - Whether to run in debug mode
 *
 * env: pigai_DEBUG
 * @property {number} SIMULTANEOUSLY_EXECUTING - The number of models that can be executed simultaneously
 *
 * env: pigai_SIMULTANEOUSLY_EXECUTING
 * @interface
 */
export type Config = {
    pigai_DIR: string;
    PRODUCTION: boolean;
    SELECTED_UI: string;
    PORT: number;
    OPEN_IN_BROWSER: boolean;
    ADMIN_USE: boolean;
    MODEL_INDEX: string;
    MODEL_DIR?: string;
    DEBUG_MODE?: boolean;
    SIMULTANEOUSLY_EXECUTING?: number;
}

const DEFAULT_CONFIG: Config = {
    pigai_DIR: path.join(os.homedir(), "pigai"),
    PRODUCTION: false,
    SELECTED_UI: "pigai",
    PORT: 3000,
    OPEN_IN_BROWSER: true,
    ADMIN_USE: true,
    MODEL_INDEX: "https://raw.githubusercontent.com/withpigai/pigai/main/models.json",
    DEBUG_MODE: false,
    SIMULTANEOUSLY_EXECUTING: 4
};

const ENV_CONFIG: Partial<Config> = {
    pigai_DIR: process.env.pigai_DIR,
    PRODUCTION: yn(process.env.pigai_PRODUCTION),
    SELECTED_UI: process.env.pigai_SELECTED_UI,
    PORT: Number(process.env.pigai_PORT),
    OPEN_IN_BROWSER: yn(process.env.pigai_OPEN_IN_BROWSER),
    ADMIN_USE: yn(process.env.pigai_ADMIN_USE),
    MODEL_INDEX: process.env.pigai_MODEL_INDEX,
    DEBUG_MODE: yn(process.env.pigai_DEBUG),
    SIMULTANEOUSLY_EXECUTING: Number(process.env.pigai_SIMULTANEOUSLY_EXECUTING),
    get MODEL_DIR() {
        return path.join(ENV_CONFIG.pigai_DIR!, 'models');
    }
};
export default ENV_CONFIG;

function mergeConfig() {
    // if env config is not set, use default config
    for (const key in DEFAULT_CONFIG) {
        if (!(ENV_CONFIG as any)[key]) {
            (ENV_CONFIG as any)[key] = (DEFAULT_CONFIG as any)[key];
        }
    }
}

async function main() {
    mergeConfig();
    await fs.ensureDir(ENV_CONFIG.MODEL_DIR!);
}

await main();
