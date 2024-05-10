import AppDB from '../../../../../storage/app-db.js';
async function migration() {
    for (const [, value] of Object.entries(AppDB.db.models)) {
        value.settings ??= {};
        value.settings.bind ??= value.bindClass;
        value.defaultSettings.bind ??= value.bindClass;
    }
    await AppDB.saveDB();
}
export default {
    version: '2.0.9',
    migration
};
//# sourceMappingURL=v2.0.9.js.map