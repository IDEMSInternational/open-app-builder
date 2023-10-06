# Deployments

All user-generated content are stored within deployments, alongside app-specific settings such as remote data sources and app strings.




## Create Deployment
All deployments are stored in the `.idems_app/deployments` folder, and new deployments can be added by calling the script:

```sh
yarn workflow deployment create
```
This will prompt for a deployment type

| Option      | Details          | 
| --------- | ------------  | 
| New Local Deployment	    | A new standalone deployment, will have a clean configuration. This could be an entirely new app, or related to another deployment but managed independently      | 
| Extend Existing Local	    | Will inherit the configuration of another deployment for modification. This could be a country-specific or A/B testing version      | 

## Change Deployment
To set the active deployment for the workspace run the following script:
```sh
yarn workflow deployment set
```
This will present an interactive list of deployments to select from

Alternative a name can be provided to select directly
```sh
yarn workflow deployment set example
```

!!! Tip
    If the deployment name contains spaces use quotation marks when specifying, e.g. `yarn workflow deployment set "another example"`


## Customise Configuration
When a deployment is created a default configuration will be created in the `.idems_app/deployments` folder. E.g. for a deployment named *example*

```ts title=".idems_app/deployments/example/config.ts"
import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("example");

// Main Deployment config
config.google_drive = {
    sheets_folder_ids: [],
    assets_folder_ids: [],
  }
};

// Deployment app config overrides
app_config.APP_HEADER_DEFAULTS.title = 'Example Deployment'
app_config.APP_SIDEMENU_DEFAULTS.title = 'Example Deployment'

export default config;
```
This configuration provides a minimal set of options to override the default header and sidemenu text, as well as configuring a remote google_drive data source (more information below)

A full list of general configuration options can be found in [packages/data-models/deployment.model.ts](https://github.com/IDEMSInternational/parenting-app-ui/blob/master/packages/data-models/deployment.model.ts)

A full list of app_config and their default values can be found in [packages/data-models/appConfig.ts](https://github.com/IDEMSInternational/parenting-app-ui/blob/master/packages/data-models/appConfig.ts)

Any configuration changes can be applied by setting the deployment
```
yarn workflow deployment set [name]
```

The final processed config can be found in the local `config.json` file, e.g. `.idems_app/deployments/example/config.json`

## Google Drive Management
The deployment configuration requires IDs for at least two created Google Drive folders: one or more for template sheets and one or more for assets. 

The folders should again be named without spaces or special characters, and once created their unique IDs can be found by looking at the end of the URL bar when navigating inside the folder on Google Drive.

<!-- cspell:disable-next-line -->
E.g. `1ja6lzbphZaxnVv5mpQ4YHnn2qmxMiEBW`

![](images/deployment-gdrive-ids.png)


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
yarn workflow deployment import [url]
```
Where [url] can be replaced with the url of a github repository where content is stored

You will see the new deployment appear in the `.idems_app` folder and be available for selection

### Sync Content
Content from external repos can be synced in the usual way

```sh
yarn workflow sync
```
This will first update any content from the remote repo, and then proceed to also sync from external google drive


### Push Changes
A local repo can have its changes pushed to github by publishing a new release
```sh
yarn workflow repo publish
```
This will create a new git branch, apply local changes and push to github. From there a pull request can be created to merge into the main branch.

!!! warning
    If multiple authors are updating content and creating releases there is a high probability of conflicts arising. 
    
    Open pull requests should be merged before creating new content releases, and running `yarn workflow sync` to update local content from remotes.


### Github Actions
Content repos may also wish to configure github actions to support common tasks like building web previews on pull requests, or deploying releases.

Several action templates have been prepared and can be configured using the command
```sh
yarn workflow repo actions
```
This will provide interactive prompts to setup required actions

!!! note
    Several actions require additional variables configured as *Secrets* within the Github Repo   
    See the following link for more information about using [Github Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)


### Troubleshooting
If for any reason the local content repo gets into a bad/conflicted state, it can be manually resolved by opening the deployment repo in vscode and resolving using git commands. 

The content repo can be opened via shortcut `yarn workflow repo open`



    
   
## File Encryption
In cases where deployments need to share private information, such as API keys or service accounts, a special encryption folder can be used to handle encryption and decryption processes

To setup an encryption folder run
```sh
yarn workflow deployment encrypt
```

This will create a new folder named *encrypted* inside the deployment folder (if not already existing). It will also populate a private key file used to decrypt data

!!! warning
    The `private.key` file should NOT be checked into a public repo, and should be backed up securely. If lost, encrypted files will not be able to be decrypted and will have to be regenerated with a new key

With the encryption folder generated any files placed inside the encryption folder will by default be marked for encryption and ignored from associated github repositories. To trigger the encryption process simply run the workflow again

```sh
yarn workflow deployment encrypt
```

!!! note
    With the encryption folder setup anybody will be able to encrypt files using the `public.key` file, however only people with access to the `private.key` can decrypt. This can be securely shared with anybody who you wish to provide access to the encrypted files

In order to decrypt files the decryption workflow should be run

```sh
yarn workflow deployment decrypt
```
