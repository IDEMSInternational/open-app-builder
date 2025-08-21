## Overview


## Setup (Firebase Provider)
1. Deploy test functions from [Open App Builder Functions](https://github.com/IDEMSInternational/open-app-builder-functions) Repo

2a. Update deployment config to use firebase remote_functions provider
```ts
config.remote_functions={
  provider:'firebase'
}
```

2b. If functions are deployed to any region other than `us-central1` 
```ts
config.firebase={
    functions:{
        region: 'europe-west1'
    }
}
```

3. Follow steps below to enable App Check which is used to ensure functions can only be invocated from trusted sources

### App Check - Web

Follow instructions in docs to create to enable RecaptchaV3 Enterprise API on google cloud project that corresponds to firebase project, and generate a key for use on the project

https://firebase.google.com/docs/app-check/web/recaptcha-provider

Include any domains you wish to accept requests from.

Set the generated site key both in the firebase console for the web-app to be used, and within the deployment config. This key is public-facing, so fine to commit to source control

```ts
config.firebase = {
  appCheck:{recaptchaEnterpriseSiteKey:'myKey'}
}
```
Whilst a single key can be used across multiple apps, it is recommended to create per-app keys

By default only firebase functions deployed specifying appCheck will have their usage restricted to allowed sources. Additional resources such as Firestore DB can be restricted from the dashboard console.

Usage can be monitored both from the [Firebase Console](https://console.firebase.google.com) App Check page, and [Google Cloud Console Recaptcha](https://console.cloud.google.com/security/recaptcha/)

### App Check - Android
Follow instructions to link play store project with firebase app check
https://firebase.google.com/docs/app-check/android/play-integrity-provider

Additional platform setup not required as integrated with `capacitor-firebase/app-check`

### App Check - IOS
Follow instructions to integrate `DeviceCheck` on older devices (ios 11+)
https://firebase.google.com/docs/app-check/ios/devicecheck-provider

Follow instructions to integrate `App Attest` on newer devices (ios 14+)
https://firebase.google.com/docs/app-check/ios/app-attest-provider

## Testing
Remote functions can be tested locally from a debug page, with support for whitelisted device tokens.
See review notes in https://github.com/IDEMSInternational/open-app-builder/pull/3097

## TODO

### Functions
- [ ] Create and deploy specific test function for use in debug

### Tests
- [ ] Functional testing on native
- [ ] Functional testing on web
- [ ] Service and provider unit tests

### Authoring Integration
- [ ] Handle storing response in field/list for access
- [ ] Add actions to trigger
- [ ] Create feat template

## Troubleshooting

### Access to fetch has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

By default firebase enables cors for all functions, so most likely this error is a false identification. Cors errors will also get displayed if no function matching the name has been deployed. This will likely coincide with separate internal error response from firebase

```json
{
    "code": "functions/internal",
    "message": "internal",
    "name": "FirebaseError"
}
```