# Beta Commands

Beta commands provide experimental workflows that are still in development. These commands are accessed via the `beta` workflow namespace.

## Available Commands

### Import
Import a deployment from a local external repository into the workspace. This copies the deployment configuration and related files (excluding `.git`, `.gitignore`, and `app_data` folders) into the `.idems_app/deployments` directory.

```sh
yarn workflow beta import [source_path]
```

Where `[source_path]` is the local path to the external deployment repository, e.g.:

```sh
yarn workflow beta import C:\Source\my-deployment-repo
```

The deployment name is automatically extracted from the `config.ts` file in the source repository. If a deployment with the same name already exists, it will be replaced.

#### Options

| Flag | Description |
| ---- | ----------- |
| `-v, --verbose` | Show detailed logs for each file and folder copied |

#### Example

```sh
yarn workflow beta import --verbose C:\Source\my-deployment-repo
```

!!! note
    The source repository must contain a valid `config.ts` file with a `generateDeploymentConfig('name')` call. The import will fail if this file is missing or the deployment name cannot be extracted.

### Set
Set an imported external deployment as the active deployment. This runs the standard deployment set process and additionally updates the active deployment config with the external source path (if the deployment was previously imported via `beta import`).

```sh
yarn workflow beta set [deployment_name]
```

Where `[deployment_name]` is the name of the deployment to activate, e.g.:

```sh
yarn workflow beta set my_deployment
```

If the deployment has an `.external_source` file (created during import), the active deployment config will be updated with the external source path. A warning will be shown if no `.external_source` file is found.

### Sync Libraries
Sync libraries defined in the deployment configuration. This downloads library repositories (at specified tags) into the deployment's `libraries` directory, including any nested library dependencies.

```sh
yarn workflow beta sync-libraries
```

Libraries are configured in the deployment's `config.ts` via a `libraries` array:

```ts
config.libraries = [
  { repo: "https://github.com/org/library-repo", tag: "v1.0.0" },
];
```

The command will recursively resolve and download any dependencies defined in each library's own `config.ts`.

### Sync Sheets
Sync Google Sheets overrides into the external deployment's `app_data`. This reads sheet override configurations from the active deployment and updates local JSON files with data from Google Sheets.

```sh
yarn workflow beta sync-sheets
```

This requires:

- An active deployment with an `external_source` configured (via `beta set`)
- Google Drive sheet overrides configured in the deployment config under `google_drive.sheets_overrides`
- Google Drive authorization (will be triggered automatically)

Sheet overrides can reference individual sheets by `sheetId` or entire folders by `folderId`:

```ts
config.google_drive = {
  sheets_overrides: [
    { sheetId: "your-sheet-id", path: "target/path" },
    { folderId: "your-folder-id" },
  ],
};
```

!!! note
    The Google Sheets API has rate limits. When processing folders with multiple sheets, requests are automatically throttled to stay within limits.

### Pull
Pull external `app_data` into the active deployment. This reads the external source path and app data output configuration, then processes the raw JSON data from the external repository into the deployment's `app_data/sheets` directory.

```sh
yarn workflow beta pull
```

This requires:

- An active deployment with an `external_source` configured (via `beta set`)
- The external source repository must contain `app_data` with the output path specified in the deployment config

The command reads the deployment's `app_data.output_path` to locate source data, copies it into the deployment's sheets directory, and runs flow parser generators to produce any template files.
