# 🛠 One‑Time Local Setup for Fastlane Match + GCS

## TODO
- Setup via local workflow (e.g. yarn workflow ios certs)

### 1. Install prerequisites locally
Make sure you have:
- **Xcode** + Apple Developer account access
- **Fastlane** installed (`gem install fastlane` or via Bundler)
- **Google Cloud SDK** (`gcloud`) installed and authenticated

---

### 2. Create a GCS bucket
This will be the storage backend for Match. If you don’t already have one, use interactive console at https://console.cloud.google.com/storage/create-bucket, or command line:

```bash
gcloud storage buckets create your-bucket-name \
  --project your-gcp-project-id \
  --location=your-bucket-location \
  --uniform-bucket-level-access
```

Recommendations
- Call the bucket something recognisable, such as `{org}-{deployment}-ios-certs`
Use the `org` and `deployment` prefixes to help ensure globally unique (required for GCS buckets).
If planning to use the same codesigning certs across multiple deployments within an org then you may want to name along the lines of `open-app-builder-{org}-ios-certs`

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

Move to ios App directory for use in generating credentials
```bash
mv open-app-builder-ci-key.json ios/App/gc_keys.json 
```

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
| IOS_APP_IDENTIFIER | App identifier used in App Store |
---


### 6. Generate and Upload Signing Credentials
In your iOS project folder:

```bash
cd ios/App

bundle exec fastlane match appstore \
  --storage_mode google_cloud \
  --google_cloud_bucket_name your-bucket \
  --google_cloud_project_id your-project-id \
```

TODO - maybe just use application credentials?
When promoted sign in using your Apple Developer Account credentials (username/password)

This will:
- Create a new signing certificate + provisioning profile (if none exist)
- Encrypt them with your `MATCH_PASSWORD`
- Upload them to your GCS bucket

You can also run for other types:
```bash
bundle exec fastlane match development
bundle exec fastlane match adhoc
```

---

### 6. Verify in GCS
Check your bucket — you should see encrypted `.p12` and `.mobileprovision` files.

---

### 7. CI/CD Usage
Now in GitHub Actions, you just need:

```yaml
- name: Authenticate with Google Cloud
  uses: google-github-actions/auth@v2
  with:
    credentials_json: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}

- name: Setup signing with Match
  working-directory: ios/App
  run: bundle exec fastlane match appstore --readonly
  env:
    MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
    MATCH_STORAGE_MODE: google_cloud
    MATCH_GOOGLE_CLOUD_BUCKET_NAME: ${{ secrets.IOS_MATCH_GCS_BUCKET }}
    MATCH_GOOGLE_CLOUD_PROJECT_ID: ${{ secrets.IOS_MATCH_GCS_PROJECT }}
```

Fastlane will pull the certs/profiles from GCS and install them into the CI macOS runner.

---

# ✅ Summary
1. **Create GCS bucket**  
2. **Create service account + JSON key** (upload to GitHub Secrets)  
3. **Run `fastlane match init` locally** with GCS backend  
4. **Run `fastlane match appstore` (and/or development/adhoc)** locally to upload certs/profiles  
5. **In CI**, authenticate with GCP and run `fastlane match` → everything “just works”  

---
