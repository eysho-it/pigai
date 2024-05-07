# pigai Install API

You can install models on the fly using the `FetchModels` class.

```ts
import {FetchModels} from 'pigai';

const allModels = await FetchModels.fetchModels();
const firstModel = Object.keys(allModels)[0];

const installModel = new FetchModels({
    download: firstModel,
    latest: true,
    model: {
        settings: {
            // extra model settings
        }
    }
});

await installModel.startDownload();
```

After the download is finished, this model will be the active model.

## Configuration

You can change the active model by changing the `pigaiDB`

```ts
import {pigaiDB} from 'pigai';

pigaiDB.db.activeModel = Object.keys(pigaiDB.db.models)[0];

await pigaiDB.saveDB();
```

You also can change the model settings by changing the `pigaiDB`

```ts
import {pigaiDB} from 'pigai';

const selectedModel = pigaiDB.db.models[pigaiDB.db.activeModel];
selectedModel.settings.context = 4096;

await pigaiDB.saveDB();
```

For extra information about the configuration, please read the [configuration guide](./configuration.md)
