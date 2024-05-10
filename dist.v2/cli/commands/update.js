import { Command } from 'commander';
import { $ } from 'execa';
import ora from 'ora';
export const updateCommand = new Command('update');
updateCommand.description('Update server to the latest version')
    .action(async () => {
    const spinner = ora('Updating PigAI');
    spinner.start();
    await $ `npm i -g pigai@latest`;
    const newVersion = (await $ `pigai --version`).stdout.trim();
    spinner.succeed('PigAI updated: ' + newVersion);
});
//# sourceMappingURL=update.js.map