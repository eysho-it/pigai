export declare const packageJSON: any;
/**
 * PigAI config, that can be set by env variables
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
 * @property {string} MODEL_INDEX - The url to the model index, currently fetch from PigAI repo
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
};
declare const ENV_CONFIG: Partial<Config>;
export default ENV_CONFIG;
