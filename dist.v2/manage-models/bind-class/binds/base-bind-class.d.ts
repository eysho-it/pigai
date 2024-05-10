import { ModelSettings } from '../../../storage/app-db.js';
import { ChatContext } from '../chat-context.js';
export default abstract class BaseBindClass<T> {
    modelSettings: ModelSettings<T>;
    static shortName?: string;
    static description?: string;
    constructor(modelSettings: ModelSettings<T>);
    abstract initialize(): Promise<void> | void;
    abstract createChat(): ChatContext;
}
