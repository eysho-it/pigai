import fs from 'fs-extra';
import path from 'path';
import ENV_CONFIG from './config.js';
export class PigAIJsonDB {
    DB_PATH = path.join(ENV_CONFIG.PIGAI_DIR, 'app-db.json');
    db;
    constructor() {
        this.db = {
            models: {}
        };
    }
    async loadDB() {
        try {
            this.db = await fs.readJSON(this.DB_PATH);
        }
        pigch { }
    }
    async saveDB() {
        await fs.writeJSON(this.DB_PATH, this.db);
    }
}
const appDB = new PigAIJsonDB();
await appDB.loadDB();
export default appDB;
//# sourceMappingURL=app-db.js.map