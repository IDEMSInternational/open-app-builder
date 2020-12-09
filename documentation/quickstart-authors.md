# Quickstart - Authors

## Initial Setup

### Download the repo as per general instruction

Follow instructions from the main readme to clone this repo and yarn package manager

### Ensure all packages are up-to-date

```
yarn install
```

### Setup required configuration

All configuration is pre-established in the `scripts/config` folder, however is encrypted to avoid sharing sensitive information publically.

You must optain a `private.key` file from the development team which you can copy into the `scripts/config` folder.

Once the file is copied run the following command:

```
npm run scripts decrypt-config
```

You will see additional files populate to the `scripts/config` folder such as they become decrypted

### Connect to Google Drive

All users need to connect to their personal google drive account to access files shared in content folders. This only has to be done once to grant permission to read files and file metadata (e.g. dates modified) from the google drive.

To connect to your google account you must run:

```
npm run scripts gdrive-auth
```

You will see a warning message to connect the unverified app. Use the advanced dropdown to accept.

## Working with Content

### Sync and Process latest PLH Google Drive Data

You can download the PLH folder from Google Drive on demand to view and changes. Simply run:

```
npm run scripts sync-plh-content
```

YOu will see an output showing folders checke and files changed, with status represented as:

`[M]` - The file has been modified
`[-]` - The file is unchanged
`[N]` - The file is new

You will also see any potential issues flagged with warning messages, and two summary tables - one of data that was `skipped` (ignored) and one of `App Data` that has been passed for processing

### Check for data issues

When data is synced, a preview of the data as processed for the app is put in the `scripts/src/plh-data-convert/output` folder.

You will see several files with a `.ts` extension, representing all flows, collated by flow type. Opening each of these files will also perform a quick check for data consistency issues with the app definitions

### Viewing changes in the app

Any changes downloaded will also be available to the app when running locally.
To run the app with your latest downloaded data simply run

```
npm run start
```

### Comitting changes

For content changes, it is not required to commit these to github as any developer will also have access to the same gdrive updates and will usually pull prior to release. 

Additionally, some scripts (plh conversations) use dynamically generated variables to populate id fields, which will therefore change every time the script is run (This will hopefully be improved on in the future)


However it may sometimes be good practice to make a pull request for the changed data, if wishing to identify specific things of note to developers (although this might be easier outside of github).

### Changing the GDrive data source

If you are using a different google drive folder (e.g. for testing), it is possible to change where the downloader syncs data from. The way the api works, is by searching for a folder across all folders you have provided authorisation from when signing in to your google account, for a name hardcoded in `scripts\src\gdrive-download\index.ts`

You can change the name of the variable `GOOGLE_DRIVE_TARGET_FOLDER` in that file to specify a different named folder somewhere on your google drive. In the future we should probably expose this as a user variable in the config files.
