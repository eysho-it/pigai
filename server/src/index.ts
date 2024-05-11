import RemotePigAI from './server/remote/remote-catai.js';
import FetchModels from './manage-models/about-models/fetch-models.js';
import createChat, {getModelPath} from './manage-models/bind-class/bind-class.js';
import PigAIDB from './storage/app-db.js';
import ENV_CONFIG from './storage/config.js';
import {PigAIError} from './errors/PigAIError.js';
import {initPigAILlama} from './manage-models/bind-class/binds/node-llama-cpp/node-llama-cpp-v2/node-llama-cpp-v2.js';

export * from 'node-llama-cpp';

const downloadModel = FetchModels.simpleDownload;

export {
    PigAIError,
    RemotePigAI,
    FetchModels,
    createChat,
    PigAIDB,
    getModelPath,
    downloadModel,
    initPigAILlama,
    ENV_CONFIG as PIGAI_ENV_CONFIG,
};