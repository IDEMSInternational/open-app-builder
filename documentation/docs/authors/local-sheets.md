# Local Sheets

!!! example "Experimental"

    This feature is experimental and may not support all authoring features.
    Feedback is welcome

## Setting local deployment
By default a separate deployment is used for working with a local-only set of sheets.
It can be enabled by setting as the active deployment 

```
yarn workflow deployment set local
```

In order to run the app viewing sheets from the custom local default instead of default app data folder a different start script must be run

```sh
yarn start:local
```

This will start both the server to run the app and the sync process to convert locally authored sheets, so no other scripts are required



## Authoring sheets locally
All sheets are stored directly within the deployment folder, located at `.idems_app\deployments\local\sheets`

You will see an initial `demo.xlsx` file containing sample home screen and sidemenu templates. Any additional .xlsx files created within this directory will be processed as app templates

Changes saved will automatically be converted and made viewable in the app after around 10 to 15 seconds

!!! note

    Currently app assets and translations are not supported in local development mode


## Troubleshooting

**Wrong or blank home screen loaded**   
This can happen if angular fails to correctly clear caches when swapping between deployments. 
It should be fixed by ensuring the local deployment is set and then running the `yarn start:local` script for a second time.