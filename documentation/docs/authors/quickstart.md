# Quickstart

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
yarn scripts config decrypt
```

You will see additional files populate to the `scripts/config` folder such as they become decrypted

### Connect to Google Drive

All users need to connect to their personal Google Drive account to access files shared in content folders. This only has to be done once to grant permission to read files and file metadata (e.g. dates modified) from the google drive.

To connect to your Google account you must run:

```
yarn workflow sync_authorize
```

You will be prompted to sign into your Google account in a browser window and grant the app access. You may see a warning message to connect the unverified app. Use the advanced dropdown to accept.

## Working with Content

### Sync and Process latest PLH Google Drive Data

You can download the PLH folder from Google Drive on demand to view and changes. Simply run:

```
yarn workflow sync
```

You will see a summary of the output showing and details can be found in the referenced log folder:

You will also see any potential issues flagged with warning messages, and two summary tables - one of data that was `skipped` (ignored) and one of `App Data` that has been passed for processing

### Viewing changes in the app

Any changes downloaded will also be available to the app when running locally.
To run the app with your latest downloaded data simply run

```
yarn start
```

### Committing changes

For content changes, it is not required to commit these to github as any developer will also have access to the same gdrive updates and will usually pull prior to release. 

Additionally, some scripts (plh conversations) use dynamically generated variables to populate id fields, which will therefore change every time the script is run (This will hopefully be improved on in the future)


However it may sometimes be good practice to make a pull request for the changed data, if wishing to identify specific things of note to developers (although this might be easier outside of github).
