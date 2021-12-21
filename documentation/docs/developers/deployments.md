# Deployment Configuration

The app system has support for multiple app deployment configurations from within the same repo. 

## Create Deployment
All deployments are stored in the `.idems_app/deployments` folder, and new deployments can be added simply by creating new subfolders that include configuraiton files.

For this example we will create a folder called `my_deployment`. This can be created either using a file explorer, or via script such as:

```sh
mkdir .idems_app/deployments my_deployment
```

!!! tip
    The folder can have any name, but it is recommended to avoid special characters and spaces.

Create a configuration file inside the folder with either named `config.ts` or, a with name that ends `.config.ts` such as `default.config.ts`.

Populate the file with configuration settings. A minimal example could be:

```ts title=".idems_app/deployments/my_deployment/default.config.ts"
import { IDeploymentConfig } from "data-models";

const config: IDeploymentConfig = {
  name: "My Deployment",
  google_drive: { assets_folder_id: "", sheets_folder_id: "" },
};

export default config
```

For full configuration options see the included `IDeploymentConfig` type definition 

### Google Drive Folders
The deployment configuration requires IDs for two created google drive folders, one for template sheets and one for global assets. 

The folders should again be named without spaces or special characters, and once created their unique IDs can be found by looking at the end of the URL bar when navigating inside the folder on Google Drive

E.g. `1ja6lzbphZaxnVv5mpQ4YHnn2qmxMiEBW`

![](images/deployment-gdrive-ids.png)
## Create Sub-Deployment
By default all deployment folders manage their own local caches and default settings. If creating multiple deployments related to the same google sheet and asset folders, it is usually more efficient to include in the same deployment folder and simply extend the config.

For example, we could create a `prod.config.ts` file that filters out sheets of a specific type 

```ts title=".idems_app/deployments/my_deployment/prod.config.ts"
import DEFAULT_CONFIG from "./default.config.ts";

const config = DEFAULT_CONFIG
config.name = "Production Config"
config.app_data.sheets_filter_function = (flow) => flow.subtype!=='debug'

export default config
```

!!! Tip
    When using multiple configs it is recommended to have a default config that does not include any filters, so that complete data can be synced and populated to the cache for use by other deployments