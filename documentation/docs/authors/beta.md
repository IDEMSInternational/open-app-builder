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

### Import Sync
Sync sheets and assets from google drive to the external repository (as `sync_sheets` and `sync_assets`), then import it.

```sh
yarn workflow beta import_sync [source_path]
```

| Flag | Description |
| ---- | ----------- |
| `-s, --skip-download` | Skip download and use previously downloaded sheets and assets |
| `-v, --verbose` | Show all logs |

### Sync Sheets
Download sheets from the `google_drive.sheets_folders` listed in the deployment config, convert them to flow json in the external repository `app_data/sheets` folder, then process all sheets into the app. Flows no longer present in google drive are deleted from the external repository.

Requires a deployment to have been imported first.

```sh
yarn workflow beta sync_sheets
```

| Flag | Description |
| ---- | ----------- |
| `-s, --skip-download` | Skip download and use previously downloaded sheets |
| `-v, --verbose` | Show all logs |

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
