# PLH Data
This package contains data used in the PLH version of the app

## Syncing data updates
Data can be syncd from corresponding google drive folders via the script
```
npm run scripts sync-plh-content
```

## Translations
Files for translation, and compiled translation strings are automatically generated during sync scripts.

Any strings for use in translations should be placed in the `./translations/from_translators` folder named in the format `{filename}.{langCode}.json`

The final output of translation strings can be found in the `./data/translation_strings` folder.

References to these strings are stored in individual data files, so that the app can quickly know what rows have text available for translation and which languages currently have existing translations