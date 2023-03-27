import 'zx/globals';

await within(async () => {
    cd('../client');

    await $`npm run build`;
});


await fs.copy('../client/dist', './www');