# Translations

This workspace handles scripts used for translatable content.

It's current functionality is limited mostly just to copy source and output folders, but will likely be extended in the future to manage upload and download from translation platforms, and managing multiple sets of translation materials

## CLI

Generate translations files from input
```
yarn workspace translations start generate -i .idems_app/deployments/plh/app-data/sheets -o .idems_app/deployments/plh/app-data/translations
```

## References and Links
- https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89
- https://www.npmjs.com/package/commander