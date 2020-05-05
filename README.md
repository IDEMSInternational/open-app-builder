# Parenting App UI

## Intro

This is the main frontend repository for the parenting app.

It was created using the Ionic CLI and it consists of four main parts:
- Angular 9
- Ionic v4
- Ionic Native via Cordova
- Cordova Android 8.1

By using Cordova we can support Android 4.4 Kitkat and above. (API Level 19, October 31, 2013 release).

## Developer Setup

## Prequisites 
1. Download and Install Node from - https://nodejs.org/en/download/
2. Download and Install Yarn from  - https://classic.yarnpkg.com/en/docs/install/#windows-stable
3. Install angular CLI - yarn global add @angular/cli
4. Install ionic CLI - - yarn global add @ionic/cli
5. Download and install Android Studio - https://developer.android.com/studio

## After the prequisites are installed 
1. Clone this repository
2. Run powershell and change the directory to the your repository
3. Run ```yarn install``` or ```npm install```
4. To view in a web browser run ```yarn start``` or ```npm start```

## Building / Running app on Android

### Setting up Building for Android (on Windows)

1. First install JDK 8 and make sure environment variable **JAVA_HOME** points to the folder that looks like this ``` C:\Program Files\Java\jdk1.8.0_241 ```
2. Secondly install the Android SDK (which will be installed if you install Android Studio).
3. Set the environment variable **ANDROID_HOME** to the location of your Android SDK install. This will probably look like
``` C:\Users\<USER_NAME>\AppData\Local\Android\Sdk ```
4. Download Gradle extract it to a folder in your program files folder for example
``` C:\Gradle\gradle-6.3\ ```
5. Add the following to your **PATH** environment variable so we can execute java, gradle and android commands.
``` 
%JAVA_HOME%\bin
C:\Gradle\gradle-6.3\bin
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\platform-tools
```
6. Open Android studio, now open Tools > SDK Manager and install the Android SDK packages required by Cordova (these are listed here: https://cordova.apache.org/docs/en/latest/guide/platforms/android/#adding-sdk-packages)
7. Now from a command line within the parenting-app-ui folder run 
```ionic build``` and then ```ionic cordova build android``` and you should be able to build an APK (Android App Package file) which can be installed on a device.

### Setting up Building for Android (on Linux or MacOS)
If you want to setup building for Android on Linux or MacOS then you'll need to install
- JDK 8: https://www.oracle.com/java/technologies/javase-jdk8-downloads.html 
- Gradle: https://gradle.org/install/ 
- Android Studio: https://developer.android.com/studio/index.html

Once you've installed those tools you'll also need to make sure you PATH and ANDROID_HOME environment variables are correct. More on this here: https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#os-x-and-linux 

from a command line within the parenting-app-ui folder run 
```ionic build``` and then ```ionic cordova build android``` and you should be able to build an APK (Android App Package file) which can be installed on a device.

### Running on an Android Emulator
1. Open Android studio and follow the steps here https://developer.android.com/studio/run/managing-avds#createavd to create an Android emulator. When choosing a system image to create an emulator for do not choose a version of Android older than 4.4 Kitkat (API Level 19).
2. Once you've created an emulator run the following command from within the parenting-app-ui folder
```ionic cordova run android```

### Running on a physical Android device (developing on Windows)
1. Make sure you've followed all the setup steps in Setting up Building for Android Devices.
2. In order to run on a physical Android device you will need to download the adb driver for your device onto your Windows computer.
- If you have a Google Nexus or Pixel device use this tutorial: https://developer.android.com/studio/run/win-usb 
- If you have an Android phone from any other manufacturer use this tutorial: https://developer.android.com/studio/run/oem-usb 
3. Plug in your Android device and make sure from within the settings you've enabled USB debugging.
4. Run in the command line ```adb devices``` to check that your device is connected via ADB.
5. Now to run the parenting app on your device, cd into the parenting-app-ui folder and run
```ionic cordova run android```

### Running on a physical Android device (Linux or MacOS)
1. Make sure you've followed the previous steps for setting up JDK8, Gradle and Android Studio.
2. If on Linux run sudo apt-get install adb
3. Plug in your Android device and make sure from within the settings you've enabled USB debugging.
4. Run in the command line ```adb devices``` to check that your device is connected via ADB.
5. Now to run the parenting app on your device, cd into the parenting-app-ui folder and run
```ionic cordova run android```
