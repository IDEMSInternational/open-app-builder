# Translations

Translations are managed using `.pot` and `.po` files. These industry-standard formats are compatible with most translation services and tools.

## Translations with Crowdin

To enable translations, a central repository should be established. This repository will serve multiple content repositories and integrate with Crowdin via the [Crowdin GitHub integration](https://store.crowdin.com/github). This setup allows source strings to be automatically pushed to Crowdin and translated strings to be pulled back into the repository.

Content repositories can interact with the central translations repository using GitHub Actions. Specifically, actions are available to:

- **[Upload Source Strings](../actions/#content-synchronization-actions):** Push new or updated source strings to the central translations repository.

- **[Download Translated Strings](../actions/#content-synchronization-actions):** Pull translated strings from the central repository.

These actions are triggered manually by users to prevent unnecessary translation updates during ongoing content development.

## Central translation repository

Example central source strings and translated strings repository file can be found [here](https://github.com/IDEMSInternational/plh-digital-content)

##Content Repository Config

`language_mappings.json` and `translator_settings.json` files will need to be configured within the root level of the content repository

**language_mappings.json**

```json
{
  "{2 letter language code}": "{country and language code}"
}
```
- In the example above:

  - `{2 letter language code}` (e.g., `es`) — _Replace with the two-letter ISO language code._

  - `{country and language code}` (e.g., `mx_es`) — _Replace with the country and language code combination as required._


**translator_settings.json**

```json
{
    "CoreFiles": "../open-app-builder/.idems_app/deployments/{internal deployment name}/app_data/sheets",
    "ComposeResult": "app/1_compose_result",
    "CoreGroups": [["data_list", ["campaign_rows", "campaign_schedule", "legal_terms","generated"]],["global", 
    ["legal_terms"]],["template", ["legal_terms"]],["tour", [""]]],
    "SplitGroups": [["main","{internal deployment name}"],],
    "ExtractResult": "app/2_extract_result",
    "ReadyForTranslation": "app/3_ready_for_translators",
    "PostTranslation": ["../plh-digital-content/translations/{internal deployment name}"],
    "PostTranslationJSONs": "app/4_result_from_translators",    
    "FinalDictionaries": "app/5_completed_dictionaries"
}
```

- In the example above:

  - `{internal deployment name}` (e.g., `facilitator_app`) — _Replace with deployment name specified in [config.env](../actions/#configuration)._

