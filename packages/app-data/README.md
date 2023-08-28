# App Data
This package holds deployment data not synced with any 3rd party content repo.

It has been deprecated on the `master` branch but can still be used on deployment branches by updating local `.gitignore` to allow required files and syncing

NOTE - it will likely be fully deprecated in the future
As part of deprecation process large historical assets should ideally be removed also

## Translations
Files for translation, and compiled translation strings are automatically generated during sync scripts.

Any strings for use in translations should be placed in the `./translations_source/from_translators` folder named in the format `{filename}.{langCode}.json`

The final output of translation strings can be found in the `./translations/strings` folder.

References to these strings are stored in individual data files, so that the app can quickly know what rows have text available for translation and which languages currently have existing translations