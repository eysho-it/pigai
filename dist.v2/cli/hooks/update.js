import { tryCheckForUpdate } from '../../utils/check-for-update.js';
const POST_ACTION_UPDATE = ['install', 'models'];
export const updateHook = [
    'postAction',
    async (thisCommand, actionCommand) => {
        if (POST_ACTION_UPDATE.includes(actionCommand.name()))
            await tryCheckForUpdate();
    }
];
//# sourceMappingURL=update.js.map