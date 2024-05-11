import * as path from 'path';
import * as os from 'os';
import yn from 'yn';
import fs from 'fs-extra';
import {fileURLToPath} from 'url';

const __dirname = fileURLToPath(new URL('./', import.meta.url));
export const packageJSON = await fs.readJSON(path.join(__dirname, '..', '..', 'package.json'));

/**
 * PIGAI config, that can be set by env variables
 * @property {string} PIGAI_DIR - The directory to store models and other data.
 *
 * env: PIGAI_DIR
 * @property {boolean} PRODUCTION - Whether to run in production mode
 *
 * env: PIGAI_PRODUCTION
 * @property {string} SELECTED_UI - The web ui to use
 *
 * env: PIGAI_SELECTED_UI
 * @property {number} PORT - The port to use for the server
 *
 * env: PIGAI_PORT
 * @property {boolean} OPEN_IN_BROWSER - Whether to open the website in the browser
 *
 * env: PIGAI_OPEN_IN_BROWSER
 * @property {boolean} ADMIN_USE - Whether to use admin features
 *
 * env: PIGAI_ADMIN_USE
 * @property {string} MODEL_INDEX - The url to the model index, currently fetch from pigai repo
 *
 * env: PIGAI_MODEL_INDEX
 * @property {string} MODEL_DIR - The directory to store models
 *
 * env: PIGAI_DIR
 * @property {boolean} DEBUG_MODE - Whether to run in debug mode
 *
 * env: PIGAI_DEBUG
 * @property {number} SIMULTANEOUSLY_EXECUTING - The number of models that can be executed simultaneously
 *
 * env: PIGAI_SIMULTANEOUSLY_EXECUTING
 * @interface
 */
export type Config = {
    PIGAI_DIR: string;
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
    PIGAI_DIR: path.join(os.homedir(), "pigai"),
    PRODUCTION: false,
    SELECTED_UI: "pigai",
    PORT: 3000,
    OPEN_IN_BROWSER: true,
    ADMIN_USE: true,
    MODEL_INDEX: "https://raw.githubusercontent.com/eysho-it/pigai/main/models.json",
    DEBUG_MODE: false,
    SIMULTANEOUSLY_EXECUTING: 4
};

const ENV_CONFIG: Partial<Config> = {
    PIGAI_DIR: process.env.PIGAI_DIR,
    PRODUCTION: yn(process.env.PIGAI_PRODUCTION),
    SELECTED_UI: process.env.PIGAI_SELECTED_UI,
    PORT: Number(process.env.PIGAI_PORT),
    OPEN_IN_BROWSER: yn(process.env.PIGAI_OPEN_IN_BROWSER),
    ADMIN_USE: yn(process.env.PIGAI_ADMIN_USE),
    MODEL_INDEX: process.env.PIGAI_MODEL_INDEX,
    DEBUG_MODE: yn(process.env.PIGAI_DEBUG),
    SIMULTANEOUSLY_EXECUTING: Number(process.env.PIGAI_SIMULTANEOUSLY_EXECUTING),
    get MODEL_DIR() {
        return path.join(ENV_CONFIG.PIGAI_DIR!, 'models');
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
