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
