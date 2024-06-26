import {Command} from "commander";
import ENV_CONFIG from "../../storage/config.js";
import {fork} from "child_process";
import {fileURLToPath} from "url";
import {RESTART_EXIT_CODE} from "../../storage/const.js";
import path from "path";

export const serveCommand = new Command('serve');

serveCommand.alias('up')
    .description('Open the chat website')
    .option('--ui [ui]', 'The ui to use')
    .action(async ({ui = ENV_CONFIG.SELECTED_UI}) => {

        let exitCode = RESTART_EXIT_CODE;
        while (exitCode === RESTART_EXIT_CODE) {
            exitCode = await runServer(ui);
        }
    });

function runServer(ui: string): Promise<number> {
    const subProcess = fork(findServerScript(), {
        stdio: 'inherit',
        env: {
            ...process.env,
            PIGAI_SELECTED_UI: ui,
            PIGAI_PRODUCTION: (!ENV_CONFIG.DEBUG_MODE).toString()
        }
    });

    return new Promise(res => subProcess.once('exit', res));
}

function findServerScript() {
    let __dirname = fileURLToPath(new URL('./', import.meta.url));
    return path.join(__dirname, '..', '..', 'server', 'server.js');
}
