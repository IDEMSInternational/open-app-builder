## Overview



## Setup (Firebase Provider)


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

### Function Deployment


### Debug Tokens


## PR Notes

Closes? #3015

## TODO

### Actions
- [ ] Handle storing response in field/list

### Firebase Provider
- [ ] Test on native; https://github.com/capawesome-team/capacitor-firebase/tree/main/packages/app-check#android
- [ ] Test on deployed debug
 

## Review Notes
Update debug deployment firebase config to include appCheck site key and enable 
remote functions with firebase provider

```ts
config.firebase = {
  ...
  appCheck:{recaptchaEnterpriseSiteKey:'6LdLYakrAAAAAGW1eU7MAPdsMUIwxYk4y3LqxiVO'}
}
config.remote_functions={
  provider:'firebase'
}
```

```bash
yarn workflow deployment set debug
```

## Author Notes
- [ ] Technical dev uses term `invoke` to specify remote function execution, however authoring currently more simply referred to as `run`. Does the naming convention make sense and accurately inform author that they are executing defined code on a remote server?


## Dev Notes
