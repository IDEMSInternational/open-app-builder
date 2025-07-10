# Actions

Actions available within content repositories, along with their triggers and descriptions. These are called and maintained [here](https://github.com/IDEMSInternational/open-app-builder-actions).

## Deployment Actions

| Action                                   | Trigger                | Description                                                                                  |
|-------------------------------------------|------------------------|----------------------------------------------------------------------------------------------|
| **Android - Release to Google Play**      | Manual (by user)       | Automated release of the Android app to Google Play.                                         |
| **Deploy - Firebase**                     | Automated (on commit to `main`) | Deploys the current content to Firebase as a web preview.                                    |
| **Firebase - Release**                    | Manual (by user)       | Deploys the current content to Firebase as a stable web preview, matching the Android release.|
| **Deployment Preview (PR Preview)**       | Automated (on PR tag)  | Deploys the current PR branch to Firebase for web preview.                                   |

## Content Synchronization Actions

| Action                                   | Trigger                | Description                                                                                  |
|-------------------------------------------|------------------------|----------------------------------------------------------------------------------------------|
| **Perform Content Sync and Create a PR**  | Manual (by user)       | Synchronizes content from spreadsheets to the repository and creates a PR for review.         |
| **Download Translated Strings**           | Manual (by user)       | Syncs translated content from the central repository and creates a PR with the changes.       |
| **Upload Source Strings**                 | Manual (by user)       | Syncs source strings from the current repository to the central repository and creates a PR.  |

## Configuration

A `config.env` file should be created in the root directory of the repository with the following variables:

```env
DEPLOYMENT_NAME=           # Internal deployment name
ENCRYPTED=                 # Set to true if using Firebase encryption
LFS_USED=                  # Large File Storage flag
FIREBASE_HOSTING_TARGET=   # Firebase preview details
FIREBASE_PROJECT_ID=       # Firebase project ID
FIREBASE_HOSTING_CHANNEL=  # Firebase hosting channel
FIREBASE_HOSTING_RELEASE_TARGET= # Firebase release target
APP_ID=                    # Android Play Store app ID
```
