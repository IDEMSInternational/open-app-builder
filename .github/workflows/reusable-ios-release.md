# iOS Reusable Release Workflow

This document explains how to configure and use the reusable iOS GitHub Action for building and deploying apps to **TestFlight** or **Appetize**.  

It covers:
- Prerequisites  
- Google Cloud setup (bucket + service account)  
- App Store Connect API keys  
- GitHub secrets and variables  
- How to trigger the workflow  
- How to verify credentials in Google Cloud Storage  

## 1. Install prerequisites locally

Make sure you have:
- **Apple Developer Account access**  
- **Google Cloud SDK** (`gcloud`) installed and authenticated  

---

## 2. Create a GCS bucket

All App Store apps need to be signed with credentials linked to an Apple Developer account. Google Cloud Storage (GCS) will be used to store **certificates** (shared across apps in the account) and **provisioning profiles** (per‑app, stored in subfolders).

If you don’t already have a bucket, create one via the console:  
👉 https://console.cloud.google.com/storage/create-bucket  

Or via CLI:

```bash
gcloud storage buckets create your-bucket-name \
  --project your-gcp-project-id \
  --location=us-central1 \
  --uniform-bucket-level-access
```

**Recommendations**
- Use a globally unique, lowercase name such as:  
  ```
  {org}-open-app-builder-ios-certs
  ```
  Example: `idems-open-app-builder-ios-certs`
- Prefer `us-central1` for proximity to GitHub runners, unless your org requires a specific region (e.g. `europe-west1`).
- One bucket can be shared across multiple apps. Per‑app buckets are possible but make cert renewal/revocation harder.

---

## 3. Create a Service Account for CI

Create a service account (if not already done).  
👉 https://console.cloud.google.com/iam-admin/serviceaccounts  

Or via CLI:

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

⚠️ **Do not commit this file.**  
After uploading to GitHub secrets, delete it locally.

---

## 4. Generate an App Store Connect API Key

If not already created:

1. Log into [App Store Connect](https://appstoreconnect.apple.com/access/integrations/api)  
2. Go to **Integrations → App Store Connect API**  
3. Create a new key, e.g. `[Open App Builder] CI`  
4. Note the **Issuer ID** and **Key ID**  
5. Download the `.p8` key file  

---

## 5. Configure GitHub Actions

Store the following **variables** and **secrets** in your deployment repo.

### Variables
| Name | Value |
|------|-------|
| `GCP_IOS_CERTS_PROJECT_ID` | Google Cloud Project ID where bucket is stored |
| `GCP_IOS_CERTS_BUCKET_ID`  | Google Cloud Bucket ID where certs are stored |
| `APP_STORE_TEAM_ID`        | Apple Developer Team ID (from [Membership Details](https://developer.apple.com/account)) |

### Secrets
| Name | Value |
|------|-------|
| `GCP_IOS_CERTS_SERVICE_ACCOUNT_KEY` | JSON contents of exported service account key |
| `GCP_IOS_CERTS_ENCRYPTION_PASSWORD` | Custom password used by Fastlane to encrypt data in GCS |
| `APP_STORE_CONNECT_API_KEY_ID`      | Key ID from App Store Connect |
| `APP_STORE_CONNECT_API_ISSUER_ID`   | Issuer ID from App Store Connect |
| `APP_STORE_CONNECT_API_KEY`         | Contents of the `.p8` key file |
| `APPETIZE_TOKEN`                    | API token if deploying to Appetize |

---

## 6. Create a Workflow to Trigger the Reusable Action

In your deployment repo, create a workflow file (e.g. `.github/workflows/ios-release.yml`):

```yaml
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
    # Calls the reusable workflow from the builder repo
    uses: IDEMSInternational/open-app-builder-actions/.github/workflows/ios-release.yml@main
    with:
      target: ${{ github.event.inputs.target }} # "appetize" or "testflight"
    secrets: inherit
    # NB: secrets will need to passed explicitly if content repo is under a different org. See ../content_repository_actions/ios-release.yml for real world example
```

---

## 7. Run the Reusable Workflow

Trigger the workflow manually from the deployment repo.  
Choose either `appetize` or `testflight` as the target.

- `appetize` → builds an unsigned simulator `.app` and uploads to Appetize.io  
- `testflight` → builds a signed `.ipa` and uploads to TestFlight  

---

## 8. Verify in GCS

If deploying to **TestFlight**, Fastlane Match will populate credentials in your GCS bucket:

```
certs/
  appstore/
    <TEAM_ID>/
      distribution.p12
profiles/
  appstore/
    <APP_IDENTIFIER>/
      AppStore_<APP_IDENTIFIER>.mobileprovision
```

- **Certificates** are stored under `certs/appstore/<TEAM_ID>/`  
- **Provisioning profiles** are stored under `profiles/appstore/<APP_IDENTIFIER>/`  

---

✅ That’s it! You now have a reusable iOS workflow that can deploy to both **TestFlight** and **Appetize**, with credentials securely managed in Google Cloud Storage.  

---
