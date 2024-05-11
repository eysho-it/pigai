import appDB from '../../../storage/app-db.js';
import {packageJSON} from '../../../storage/config.js';

export default async function updatePigAIVersionInSettings() {
    appDB.db.installedPigAIVersion = packageJSON.version;
    await appDB.saveDB();
}
