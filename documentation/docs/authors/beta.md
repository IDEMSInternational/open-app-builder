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

### Publish
Publish content changes for the active external deployment. This runs the same release process as `yarn workflow deployment publish` (stage changes, prompt for a version tag, create a `content/<tag>` branch, commit, tag, and push), but operates directly on the external source folder rather than the copied workspace files.

```sh
yarn workflow beta publish
```

!!! note
    The active deployment (set via `beta set`) must have been imported via `beta import` and still have a valid external source path with a `.git` folder. Otherwise the command will fail and suggest running `yarn workflow deployment publish` instead.
