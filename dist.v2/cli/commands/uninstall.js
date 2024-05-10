import { Command } from 'commander';
import ENV_CONFIG from '../../storage/config.js';
import fs from 'fs-extra';
import { $ } from 'execa';
import ora from 'ora';
export const uninstallCommand = new Command('uninstall');
uninstallCommand.description('Uninstall server and delete all models')
    .action(async () => {
    const spinner = ora('PigAI uninstalled');
    spinner.start();
    await $ `npm uninstall -g pigai`;
    await fs.remove(ENV_CONFIG.PIGAI_DIR);
    spinner.succeed('PigAI uninstalled');
});
//# sourceMappingURL=uninstall.js.map