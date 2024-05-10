import { Command } from 'commander';
import { runMigrations } from './migration/migtation.js';
import updatePigAIVersionInSettings from './updateSettings.js';
export const postinstallCommand = new Command('postinstall');
postinstallCommand.description('Migrate script')
    .action(async () => {
    await runMigrations();
    await updatePigAIVersionInSettings();
});
//# sourceMappingURL=postinstall.js.map