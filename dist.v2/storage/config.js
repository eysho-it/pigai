import * as path from 'path';
import * as os from 'os';
import yn from 'yn';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('./', import.meta.url));
export const packageJSON = await fs.readJSON(path.join(__dirname, '..', '..', 'package.json'));
const DEFAULT_CONFIG = {
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
const ENV_CONFIG = {
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
        return path.join(ENV_CONFIG.PIGAI_DIR, 'models');
    }
};
export default ENV_CONFIG;
function mergeConfig() {
    // if env config is not set, use default config
    for (const key in DEFAULT_CONFIG) {
        if (!ENV_CONFIG[key]) {
            ENV_CONFIG[key] = DEFAULT_CONFIG[key];
        }
    }
}
async function main() {
    mergeConfig();
    await fs.ensureDir(ENV_CONFIG.MODEL_DIR);
}
await main();
//# sourceMappingURL=config.js.map