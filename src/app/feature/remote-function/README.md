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
Follow instructions to integrate `App Attest`
https://firebase.google.com/docs/app-check/ios/app-attest-provider

This requires the `com.apple.developer.devicecheck.appattest-environment` entitlement, declared in
`ios/App/App/App.entitlements`, and the app's bundle id and team id to be registered in the firebase
console. Note that `capacitor-firebase/app-check` uses App Attest on all ios 14+ devices with no
`DeviceCheck` fallback, and the project targets ios 14 as a minimum - so `DeviceCheck` is never used
and does not need configuring.

### App Check - Debug provider (native)

Attestation is unavailable on simulators and emulators, so non-production builds initialise app check
with the debug provider instead. Unlike web the debug token value cannot be set from javascript, so
must be provided per-platform. Register the resulting token in the firebase console under
App Check -> Apps -> (app) -> Manage Debug Tokens.

- **IOS** - handled in `AppDelegate.swift`, which stores the same token used on web (under `#if DEBUG`)
  so that only one token needs registering. To use a different token without editing the file, set an
  `AppCheckDebugToken` or `FIRAAppCheckDebugToken` environment variable on the Xcode scheme
  (Product -> Scheme -> Edit Scheme -> Run -> Arguments); these take precedence. NOTE - scheme files
  are gitignored, so any such override applies only to your local checkout.
- **Android** - the sdk generates a random token and logs it to logcat on launch (filter for
  `DebugAppCheckProvider`).

Production builds are unaffected, and always use the attestation providers above.

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