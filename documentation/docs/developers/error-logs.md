# Error Logs

## Providers
Logs are configured for multiple providers.

### Crashlytics
Firebase Crashlytics logs any native crashes as well as logged errors. The dashboard will be linked to the profile used in the `firebaseConfig.ts` file. For PLH, access can be requested from the core team.

### Sentry / GlitchTip
In addition runtime errors can be logged to Sentry (or GlitchTip) by specifying a DSN in a deployment config:

```ts
error_logging: {
  dsn: "https://abcde@domain.com/1234",
},
```

## Debugging logs
Logs viewed in GlitchTip will include a lot of useful information that can be used for debugging.

![](images/glitchtip-error.png)  

A full stack trace will be given at the bottom, with the path to the minified code. It is only mapped to the source code when the build includes source maps: the `production` build configuration in `angular.json` has none, while the `preview` and `glitchtip` configurations add them.

As you scroll down you can see the page viewed in the app as well as exact device/browser information.

![](images/glitchtip-error-2.png)  

!!! tip "Filtering by content or code release"
    To see errors from one build, for example to check whether an error still happens after a fix, type in the
    issue search bar of the deployment's GlitchTip project:

    ```
    content_version:1.3.19
    release:plh_kids_teens_my-0.26.13-a1b2c3
    ```

    The release is `<deployment name>-<app builder version>-<commit>`. Builds made before November 2026 have no
    `content_version` tag, and their native releases end in `-` without a commit.

    The commit is the first 6 characters of the app code commit the build used, usually the commit of the
    [code release](code-releases.md) tag set in `APP_CODE_BRANCH`. You can find it next to the tag on the
    [releases page](https://github.com/IDEMSInternational/open-app-builder/releases), or with
    `git rev-parse --short=6 v0.26.12^{commit}`. If `APP_CODE_BRANCH` is a branch, it is the latest commit on that
    branch at build time.

## Replicating errors
In most cases errors can likely be recreated by navigating to the same template page when browsing locally. There may however be some cases where an issue is specific to a particular browser (often older ones), or Android device.

In order to replicate older browsers, it is recommended to download a portable version of Chromium (zip) from [https://chromium.cypress.io](https://chromium.cypress.io).

If even older versions are required (not recommended) you can follow instructions from the [Chromium website](https://www.chromium.org/getting-involved/download-chromium/#downloading-old-builds-of-chrome-chromium).
