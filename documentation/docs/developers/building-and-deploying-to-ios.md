# Building and deploying to iOS

Building and deploying an app to iOS must be performed by a developer on a Mac computer. This guide does not include the process for managing the app within Apple's App Store Connect console, which is documented elsewhere (see [Apple's official documentation](https://developer.apple.com/help/app-store-connect/), or organisation-specific documentation is available from IDEMS devs on request).

## Prerequisites

### Apple Developer Account

In order to create iOS applications, you will need to enrol in the [Apple Developer Program](https://developer.apple.com/programs/), which can be done as an individual or organisation.

### XCode

In order to run applications locally on an iOS device or simulator (Apple's term for an iOS device emulator), and submit them to the App Store, you will need XCode. [XCode](https://developer.apple.com/xcode/) is available from the Mac App Store.

**XCode 26 or newer is required.** This minimum is set by Capacitor — older versions of XCode cannot build the project.

You will also need XCode CLI tools. These may have been installed with XCode, run `xcode-select -v` to check. If not already installed, run `xcode-select --install`. The CLI tools may need to be configured using the command `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`.

### CocoaPods

[CocoaPods](https://cocoapods.org/) is a dependency manager for iOS projects, and is used to build iOS apps in this project. Installing via [Homebrew](https://brew.sh/) seems to be the best method, via the command `brew install cocoapods`.

!!! note "CocoaPods vs Swift Package Manager"

    Capacitor creates new iOS projects using Swift Package Manager (SPM) by default. This project's `ios` directory is committed and uses CocoaPods, so no action is needed for normal development.

    If you ever need to regenerate the iOS platform from scratch, pass the flag to keep it on CocoaPods:

    ```sh
    npx cap add ios --packagemanager CocoaPods
    ```

    This is a holding pattern rather than a long-term choice — new versions of the Firebase Apple SDK stop being published to CocoaPods after October 2026, so a migration to SPM is expected. Existing versions remain installable, so nothing breaks at that date.

### Capacitor iOS setup

The project is already configured to build to iOS using Capacitor. See the [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios) for full details, or follow the steps below.

## Build, sign and upload the iOS app

### Building for the first time

If the deployment has not previously been built for iOS, follow these steps

1. Ensure that the deployment is fully configured to be built to iOS, in accordance with the instructions in the [deployments](./deployments.md#android-and-ios-management) section. In particular, ensure the deployment config has values set for 
```ts
config.ios.app_id = "international.idems.my-example-app"
config.ios.app_name = "My Example App"
```
1. An up-to-date `GoogleService-Info.plist` file for the deployment's registered Firebase app is required to be populated to `ios/App/App/GoogleService-Info.plist`. This can be downloaded from the Firebase console.
2. Run `yarn workflow ios configure` to generate the relevant iOS build files from the templated files using the values specified in the deployment config.
3. Generate iOS assets (app icon and splash screen), using the [capacitor-assets](https://github.com/ionic-team/capacitor-assets) package. Alternatively, the assets can be generated in [XCode directly](https://developer.apple.com/documentation/xcode/configuring-your-app-icon) after step 6.
4. Run `yarn build`
5. Run `npx cap sync ios`
6. Run `npx cap open ios` to open the project in XCode.
7. In order to sign the app, in XCode navigate to `App > Targets > App Signing & capabilities`. Set the value for the development team, using "Add account" if you have not previously configured XCode with a development team. Ensure that the option "Automatically manage signing" is checked.
8. Now build the app to a target simulator to test functionality.
9.  When ready to upload the app to App Store Connect, set the target as "Any iOS device (arm64)", and go to `Product > Archive`.
    ![](./images/xcode-target.png)
10. The process of "archiving" converts your application into the format required to upload it to the App Store. Select "Distribute App" to publish the app to App Store Connect. You will still be able to test the app through TestFlight once it is uploaded before submitting to Apple for review. Choose the options to automatically manage signing and generate a certificate. Click "Upload", and once the process is complete, the app will be available for management through [App Store Connect](https://appstoreconnect.apple.com/apps). 

### Subsequent builds

If the deployment has previously been built for iOS, follow these simplified steps to build, test and deploy.

1. Run `yarn workflow ios configure` to update the relevant iOS build files from the templated files using the values specified in the deployment config.
2. Run `yarn build`
3. Run `npx cap sync ios`
4. Run `npx cap open ios` to open the project in XCode.
5. Now build the app to a target simulator to test functionality.
6. When ready to upload the app to App Store Connect, set the target as "Any iOS device (arm64)", and go to `Product > Archive`.
    ![](./images/xcode-target.png)
7. The process of "archiving" converts your application into the format required to upload it to the App Store. Select "Distribute App" to publish the app to App Store Connect. You will still be able to test the app through TestFlight once it is uploaded before submitting to Apple for review. Choose the options to automatically manage signing and generate a certificate. Click "Upload", and once the process is complete, the app will be available for management through [App Store Connect](https://appstoreconnect.apple.com/apps). 