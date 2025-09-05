## TODO
- [ ] Intro (and link from yml)
- [ ] Check this md with AI for potential improvements
- [ ] Tidy up reusable-ios-build to use Fastfile

### 1. Install prerequisites locally
Make sure you have:
- **Apple Developer Account Access**
- **Google Cloud SDK** (`gcloud`) installed and authenticated

---

### 2. Create a GCS bucket
All appstore apps need to be signed with credentials linked to an Apple Developer account. 
Google Cloud Storage will be used to store Certificates generated for use across all apps added to the account, with per-app provisioning profiles stored in subfolders

If you don’t already have one, use interactive console at https://console.cloud.google.com/storage/create-bucket, or command line:

```bash
gcloud storage buckets create your-bucket-name \
  --project your-gcp-project-id \
  --location=your-bucket-location \
  --uniform-bucket-level-access
```

Recommendations
- Call the bucket something recognisable, such as `{org}-open-app-builder-ios-certs`
Use the `org` prefix to help ensure globally unique (required for GCS buckets). Remember that the same bucket can be be used across multiple apps (per-app buckets can also be created, although this will make it harder to update when certs are renewed or revoked)

- When specifying a region, use US to store certs nearer github action runner, e.g. `us-central1`, or if organisation requires all sensitive data stored in specific location use that, e.g. `europe-west1`

---

### 3. Create a Service Account for CI
Create a service account (if not already done). Use interactive console at https://console.cloud.google.com/iam-admin/serviceaccounts, or command line:

```bash
gcloud iam service-accounts create open-app-builder-ci \
  --description="Service account for Open App Builder CI" \
  --display-name="Open App Builder CI"
```

Give it permissions:

```bash
gcloud projects add-iam-policy-binding your-gcp-project-id \
  --member="serviceAccount:open-app-builder-ci@your-gcp-project-id.iam.gserviceaccount.com" \
  --role="roles/storage.admin"
```

Export a JSON key:

```bash
gcloud iam service-accounts keys create open-app-builder-ci-key.json \
  --iam-account=open-app-builder-ci@your-gcp-project-id.iam.gserviceaccount.com
```

The contents of this will be populated to github_actions. 

DO NOT COMMIT - after populating secret it can be deleted locally

### 4. Generate App Store Connect API Key
If not already created:

Log into the App Store Connect website and go to `Integrations` -> `App Store Connect`
https://appstoreconnect.apple.com/access/integrations/api

Create a new key, e.g. `[Open App Builder] CI`

Note the issuer id and key id, and download the key contents

### 5. Configure github actions
Store the following variables and secrets in the deployment repo github secrets

**Variables**
| name | value |
|---    |---    |
| GCP_IOS_CERTS_PROJECT_ID | Google Cloud Project ID where bucket stored       |
| GCP_IOS_CERTS_BUCKET_ID  | Google cloud Bucket ID where certs stored         |
---


**Secrets**
| name | value |
|---    |---    |
| GCP_IOS_CERTS_SERVICE_ACCOUNT_KEY | Contents of exported service-account key |
| GCP_IOS_CERTS_ENCRYPTION_PASSWORD | A custom password used by fastlane to encrypt data stored in google cloud |
| APP_STORE_CONNECT_API_KEY_ID  | Key ID listed in App Store Connect for generated key |
| APP_STORE_CONNECT_API_ISSUER_ID  | Issuer ID listed in App Store connect |
| APP_STORE_CONNECT_API_KEY  | Contents of App Store Connect p8 key   |
| APP_STORE_TEAM_ID | Team ID found in https://developer.apple.com/account under Membership Details |
| APPETIZE_TOKEN | API Token if deploying to appetize |
---

### 6. Create workflow to trigger reusable action
From deployment repo, create action
```yml
name: IOS - Release

on:
  workflow_dispatch:
    inputs:
      target:
        description: "Where to deploy"
        required: true
        default: appetize
        type: choice
        options:
          - appetize
          - testflight

jobs:
  ios_build:
    uses: IDEMSInternational/open-app-builder/.github/workflows/reusable-ios-release.yml@master
    with:
      target: ${{ github.event.inputs.target }}
    secrets: inherit
```


### 7. Run reusable workflow
Trigger the workflow from deployment repo, specifying either `appetize` or `testflight` as target
---

### 8. Verify in GCS
If deploying to `testflight`, you should see credentials populated in the GCS bucket

---
