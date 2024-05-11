import RemotePigAI from './server/remote/remote-pigai.js';
import FetchModels from './manage-models/about-models/fetch-models.js';
import createChat from './manage-models/bind-class/bind-class.js';
import PigAIDB from './storage/app-db.js';
import ENV_CONFIG from './storage/config.js';
import {PigAIError} from './errors/PigAIError.js';

const downloadModel = FetchModels.simpleDownload;

export {
    PigAIError,
    RemotePigAI,
    FetchModels,
    createChat,
    PigAIDB,
    getModelPath,
    downloadModel,
    ENV_CONFIG as PIGAI_ENV_CONFIG,
};
