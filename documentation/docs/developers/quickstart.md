# Quickstart

The main tech stack comprises of:

- Angular
- Ionic
- Capacitor

## Toolchain requirements

These are the minimum versions required to build the app. They are set by Capacitor — see the [Capacitor environment setup docs](https://capacitorjs.com/docs/getting-started/environment-setup) for full details.

| Tool               | Minimum version         | Needed for   |
| ------------------ | ----------------------- | ------------ |
| Node.js            | 22 (latest LTS advised) | All builds   |
| JDK                | 21                      | Android      |
| Android Studio     | Otter \| 2025.2.1       | Android      |
| Android SDK        | API 36                  | Android      |
| Xcode              | 26                      | iOS          |

You do **not** need to install Gradle. The project uses the [Gradle wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) (`android/gradlew`), which downloads the correct version automatically.

!!! warning "Xcode 26 is required for iOS"

    Older versions of Xcode cannot build the project at all. If you build for iOS, make sure you have updated before attempting a build.

## Additional Developer Prerequisites

1. Install angular CLI - `npm i -g @angular/cli`
2. Install ionic CLI - - `npm i -g @ionic/cli`

## Building / Running app on Android

### Setting up Building for Android (on Windows)

1. Install Android Studio (https://developer.android.com/studio)
2. Install the Android SDK for API 36 via `Tools > SDK Manager`, as illustrated here: https://capacitorjs.com/docs/android#getting-started
3. Ensure that the active deployment is fully configured in accordance with the requirements detailed in [Android app management](./deployments.md#android-app-management).
4. To populate the Android build files with the app ID, app name and version number (`content_tag_latest`) defined in the deployment config, run
   ```sh
   yarn workflow android configure
   ```
5. Build the project locally and sync android files
   ```sh
   yarn build
   npx cap sync android
   ```
6. Open the project in Android Studio `npx cap open android`
7. From Android studio you can manage the app build, emulate and run processes, as illustrated here: https://capacitorjs.com/docs/android#running-your-app

Android studio should handle the process of downloading required tools, find below guidance for manual configuration.

### Manual configuration steps - (Windows)

Android Studio installs most of what is required. Follow these steps to configure manually.

1. First install JDK 21 and make sure environment variable **JAVA_HOME** points to the folder that looks like this `C:\Program Files\Eclipse Adoptium\jdk-21`
2. Secondly install the Android SDK (which will be installed if you install Android Studio).
3. Set the environment variable **ANDROID_HOME** to the location of your Android SDK install. This will probably look like
   `C:\Users\<USER_NAME>\AppData\Local\Android\Sdk`
4. Add the following to your **PATH** environment variable so we can execute java and android commands.

```
%JAVA_HOME%\bin
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\platform-tools
```

5. Open Android studio, now open `Tools > SDK Manager` and install the SDK Platform for API 36

### Manual configuration steps - (Linux or MacOS)

If you want to setup building for Android on Linux or MacOS then you'll need to install

- JDK 21: https://adoptium.net/temurin/releases/?version=21
- Android Studio: https://developer.android.com/studio/index.html

Once you've installed those tools you'll also need to make sure you PATH and ANDROID_HOME environment variables are correct. More on this here: https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#os-x-and-linux

### Running on an Android Emulator

1. Open Android studio and follow the steps here https://developer.android.com/studio/run/managing-avds#createavd to create an Android emulator. When choosing a system image, do not choose a version of Android older than 7.0 Nougat (API Level 24), which is the app's `minSdkVersion`.

!!! note "Testing edge-to-edge display"

    Android 15 (API 35) and newer render the app behind the status and navigation bars, which older versions do not. If you are working on layout, create an API 35 or API 36 emulator as well as whichever image you normally use, and check both.
2. In case you are having problems with running the AVD you might receive an error message saying something like - _How to Enable Intel Virtualization Technology (vt-x) ……… you will need to get into your bios and enable virtualization_ if you are not sure what that is, then you can google it up for your computer model.
3. Once you've created an emulator run directly from Android Studio

### Running on a physical Android device (developing on Windows)

1. Make sure you've followed all the setup steps in Setting up Building for Android Devices.
2. In order to run on a physical Android device you will need to download the adb driver for your device onto your Windows computer.

- If you have a Google Nexus or Pixel device use this tutorial: https://developer.android.com/studio/run/win-usb
- If you have an Android phone from any other manufacturer use this tutorial: https://developer.android.com/studio/run/oem-usb

3. Plug in your Android device and make sure from within the settings you've enabled USB debugging.
4. Run in the command line `adb devices` to check that your device is connected via ADB.
5. Now to run the parenting app on your device, click the run button in Android Studio

### Running on a physical Android device (Linux or MacOS)

1. Make sure you've followed the previous steps for setting up JDK 21 and Android Studio.
2. If on Linux run sudo apt-get install adb
3. Plug in your Android device and make sure from within the settings you've enabled USB debugging.
4. Run in the command line `adb devices` to check that your device is connected via ADB.
5. Now to run the parenting app on your device, click the run button in Android Studio
