# Beta Commands

Beta commands provide experimental workflows that are still in development. These commands are accessed via the `beta` workflow namespace.

They work with an external deployment repository, which contains a `config.ts` along with synced sheets (`app_data/sheets`) and assets (`app_data/assets`). Content is processed directly into the app `src/assets/app_data` folder.

## Available Commands

### Import
Import a deployment from a local external repository. This writes the deployment config, sheets and assets to the app `src/assets/app_data` folder, and records the source path for use by the sync commands.

```sh
yarn workflow beta import [source_path]
```

Where `[source_path]` is the local path to the external deployment repository, e.g.:

```sh
yarn workflow beta import C:\Source\my-deployment-repo
```

| Flag | Description |
| ---- | ----------- |
| `-v, --verbose` | Show all logs |

!!! note
    The source repository must contain a valid `config.ts` file. The import will fail if this file is missing.

!!! note
    `[source_path]` must come before any flags, e.g. `yarn workflow beta import C:\Source\my-deployment-repo -v`. This also applies to `import_sync`.

### Import Sync
Sync sheets and assets from google drive to the external repository (as `sync_fixed_sheets` and `sync_assets`), then import it.

```sh
yarn workflow beta import_sync [source_path]
```

| Flag | Description |
| ---- | ----------- |
| `-s, --skip-download` | Skip download and use previously downloaded sheets and assets |
| `-v, --verbose` | Show all logs |

### Sync Flow Files
Process the flow jsons in the previously imported external repository `app_data/sheets` folder that have changed since they were last processed. Nothing is downloaded. If a file was removed (or this is the first sync) all flows are processed. Changed flows linked to transient sheets stay linked to their sheet.

```sh
yarn workflow beta sync_flow_files
```

| Flag | Description |
| ---- | ----------- |
| `-v, --verbose` | Show all logs |

### Refresh All
Re-process every flow json in the previously imported external repository `app_data/sheets` folder, without downloading or using cached data. Assets and the deployment config are not changed.

Flows linked to transient sheets stay linked to their sheet. Their content is the version in the external repository, which `sync_transient_sheets` keeps up to date.

```sh
yarn workflow beta refresh_all
```

| Flag | Description |
| ---- | ----------- |
| `-v, --verbose` | Show all logs |

### Sync Sheets
Download sheets from the `google_drive.sheets_folders` listed in the deployment config, convert them to flow json in the external repository `app_data/sheets` folder, then process all sheets into the app. Flows no longer present in google drive are deleted from the external repository.

Requires a deployment to have been imported first.

```sh
yarn workflow beta sync_fixed_sheets
```

| Flag | Description |
| ---- | ----------- |
| `-s, --skip-download` | Skip download and use previously downloaded sheets |
| `-v, --verbose` | Show all logs |

### Sync Transient Sheets
Download the sheets in the transient sheets folder (sheets created from flows with `open_sheet`, `create_sheet` or the `/debug` page), write their flows to the external repository `app_data/sheets` folder, then process all sheets into the app. This also runs from the "Transient sheets" button on the `/debug` page.

Each flow replaces the flow json of the same name outside the `google_drive` folder, so edits made in the sheet are kept in the external repository. A flow added to a sheet's `==content_list==` is written next to the other flows from that sheet, and linked to the sheet. Nothing is deleted from the external repository.

Flows are linked to their transient sheet only by `src/assets/app_data/transient_sheets.json`, which the `/debug` page reads. The flow jsons in the external repository have no `_source`, and processed flows in the app only have the `_source.path` of their json.

Requires a deployment to have been imported first.

```sh
yarn workflow beta sync_transient_sheets
```

| Flag | Description |
| ---- | ----------- |
| `-v, --verbose` | Show all logs |

!!! note
    The transient sheets folder is created in google drive with the first transient sheet (named `<deployment name> transient sheets`, in My Drive unless `--folder <folder_id>` is passed to `open_sheet` or `create_sheet`). The folder (with the google drive auth token used to create it) is saved to `src/assets/app_data/transient_sheets.json` with the list of transient sheets, and is what `sync_transient_sheets` downloads, without reading the deployment config. Sheets created before the folder was used are not synced: remove them with `remove_transient_sheet` and create them again.

### Sync Assets
Download assets from the `google_drive.assets_folders` listed in the deployment config to the external repository `app_data/assets` folder, then process all assets into the app. Assets no longer present in google drive are deleted from the external repository.

Requires a deployment to have been imported first.

```sh
yarn workflow beta sync_assets
```

| Flag | Description |
| ---- | ----------- |
| `-s, --skip-download` | Skip download and use previously downloaded assets |
| `-v, --verbose` | Show all logs |

!!! note
    Remote asset folders (`remote: true`) are not yet supported and will be skipped.

### Update Translations
Extract the strings to translate from the external repository flows (`app_data/sheets`) and write them as gettext templates (`.pot`) to `app_data/translations/source/<language>/`. Translation tools such as Crowdin use each `.pot` file to create a `.po` file of translations per language. Previous output in `translations/source` is replaced.

Requires a deployment to have been imported first.

```sh
yarn workflow beta update_translations
```

| Flag | Description |
| ---- | ----------- |
| `--split-by-subtype` | Write strings from flows with a `flow_subtype` to `<flow_subtype>.pot`. Strings from other flows are written to `main.pot` |
| `-v, --verbose` | Show all logs |

Strings included:

| Flow type | Strings |
| --------- | ------- |
| `global` | `value` of every row, unless `exclude_from_translation` is `TRUE` |
| `data_list` | every column with a language suffix, e.g. `title::eng` |
| `template` | `value` of rows where `include_in_translation` is `TRUE` |

The language of a string is its column suffix (e.g. `value::eng`), or else the flow's `language` column in the `==content_list==`, which defaults to `eng`. One folder is written per language found. Values that are empty, not text, or only references (e.g. `@global.app_name`) are skipped, and each string is listed once per file.

### Sync Translations
Re-process all flows from the external repository `app_data/sheets` folder into the app, adding the latest translations from the `.po` files in `app_data/translations/translated/<language>/`. Use this after new translations have been added to the external repository. Nothing is downloaded from google drive.

Flows linked to transient sheets stay linked to their sheet, and keep the edits synced from it to the external repository.

Requires a deployment to have been imported first.

```sh
yarn workflow beta sync_translations
```

| Flag | Description |
| ---- | ----------- |
| `-v, --verbose` | Show all logs |

### Remove Transient Sheet
Delete the transient sheet of a flow (created with `open_sheet` or `create_sheet`) and unlink the flow from it. The sheet is moved to the google drive bin and the flow is removed from `src/assets/app_data/transient_sheets.json`. A sheet containing several flows is only deleted once none of its flows are linked.

The flow keeps any edits synced from the sheet, as `sync_transient_sheets` also writes them to the flow json in the external repository `app_data/sheets` folder.

```sh
yarn workflow beta remove_transient_sheet [flow_name]
```

Use `ALL` as the flow name to remove every transient sheet. When no transient sheets are left, the transient sheets folder is moved to the google drive bin with everything in it, and the next transient sheet creates a new folder.

A sheet created for a folder from the `/debug` page (one sheet with every flow directly in that folder) is removed with all its flows by passing the folder instead of a flow name, e.g. `yarn workflow beta remove_transient_sheet --folder google_drive/core`.

| Flag | Description |
| ---- | ----------- |
| `-t, --type <flow_type>` | Only match flows of this type |
| `--folder <folder>` | Remove the sheet created for a folder (relative to `app_data/sheets`) |
