# Deployments

All user-generated content are stored within deployments, alongside app-specific settings such as remote data sources and app strings.




## Create Deployment
All deployments are stored in the `.idems_app/deployments` folder, and new deployments can be added by calling the script:

```sh
yarn workflow deployment_create
```
This will prompt for a deployment type

| Option      | Details          | 
| --------- | ------------  | 
| New Local Deployment	    | A new standalone deployment, will have a clean configuration. This could be an entirely new app, or related to another deployment but managed independently      | 
| Extend Existing Local	    | Will inherit the configuration of another deployment for modification. This could be a country-specific or A/B testing version      | 

!!! tip
    Extending deployments are more efficient if using content from the same google drive folder. Content can still be customised through the use of filters or other configuration options

## Change Deployment
To set the active deployment for the workspace run the following script:
```sh
yarn workflow deployment_set
```
This will present an interactive list of deployments to select from

Alternative a name can be provided to select directly
```sh
yarn workflow deployment_set example
```

!!! Tip
    If the deployment name contains spaces use quotation marks when specifying, e.g. `yarn workflow deployment_set "another example"`


## Customise Configuration
When a deployment is created a default configuration will be created in the `.idems_app/deployments` folder. E.g. for a deployment named *example*

```ts title=".idems_app/deployments/example/config.ts"
import { getDefaultAppConstants, IDeploymentConfig } from "data-models";

const app_constants = getDefaultAppConstants()

// Override any app constants here
app_constants.APP_HEADER_DEFAULTS.title = 'Example Deployment'
app_constants.APP_SIDEMENU_DEFAULTS.title = 'Example Deployment'

const config: IDeploymentConfig = {
  name: "example",
  google_drive: {
    sheets_folder_id: "",
    assets_folder_id: "",
  },
  app_constants
};
export default config;
```
This configuration provides a minimal set of options to override the default header and sidemenu text, as well as configuring a remote google_drive data source (more information below)

A full list of app_constants and their default values can be found in [packages/data-models/constants.ts](https://github.com/IDEMSInternational/parenting-app-ui/blob/master/packages/data-models/constants.ts)

A full list of general configuration options can be found in [packages/data-models/deployment.model.ts](https://github.com/IDEMSInternational/parenting-app-ui/blob/master/packages/data-models/deployment.model.ts)

Any configuration changes can be applied by setting the deployment
```
yarn scripts deployment_set [name]
```


## GitHub Management
Deployments are designed to have their content managed via external github repos. To configure a deployment to sync with an external git repository, first create the repo on github and then provide the url within the `git.content_repo` configuration object

```ts
const config: IDeploymentConfig = {
  name: "example",
  git: {
    content_repo: "https://github.com/my-org/my-git-repo",
  },
```


### Import Existing
If an external content repo already exists it is possible to directly import into the local workspace, instead of first creating a new deployment and then configuring for import. 

This can be done via the script
```
yarn workflow deployment_import [url]
```
Where [url] can be replaced with the url of a github repository where content is stored

You will see the new deployment appear in the `.idems_app` folder and be available for selection


### Push Changes
A local repo can have its changes pushed to github by creating a new content release
```
yarn workflow content_release
```
This will create a new git branch, apply local changes and push to github. From there a pull request can be created to merge into the main branch.

!!! warning
    If multiple authors are updating content and creating releases there is a high probability of conflicts arising. It is recommended to merge open pull requests before creating new content releases, and running the `yarn scripts deployment set` script to ensure local content also includes the latest remote content.

## Google Drive Managemnt
The deployment configuration requires IDs for two created Google Drive folders, one for template sheets and one for global assets. 

The folders should again be named without spaces or special characters, and once created their unique IDs can be found by looking at the end of the URL bar when navigating inside the folder on Google Drive.

E.g. `1ja6lzbphZaxnVv5mpQ4YHnn2qmxMiEBW`

![](images/deployment-gdrive-ids.png)



