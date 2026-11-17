# Testing on simulators and emulators with Maestro

[Maestro](https://maestro.dev) is an open-source tool (Apache 2.0) for automating mobile apps. It can launch
the app on an iOS simulator or Android emulator, tap buttons by their text, type, swipe, check what is on
screen and take screenshots. Steps are written as short YAML files called **flows**.

It is useful for checking native behaviour that a browser preview can't show (safe areas, pop-ups,
orientation, platform differences), and for repeating the same checks after each change. Maestro also has a
built-in [MCP server](https://docs.maestro.dev/get-started/maestro-mcp), so an AI coding assistant can drive
the app too: "run the app on the iOS simulator and check X" becomes a single request.

Maestro runs on your own machine against local simulators and emulators. It needs no account, and nothing
about it is built into the app. iOS is supported on simulators only, not real devices.

## Install

Maestro needs Java 17 or newer. See also Maestro's own
[installation guide](https://docs.maestro.dev/maestro-cli/how-to-install-maestro-cli).

=== "macOS"

```
With [Homebrew](https://brew.sh/), which also installs Java:

```sh
brew tap mobile-dev-inc/tap
brew install mobile-dev-inc/tap/maestro
```

To opt out of Maestro's usage analytics, add `export MAESTRO_CLI_NO_ANALYTICS=1` to your shell profile.
```

=== "Windows (untested)"

```
These steps follow Maestro's guide but have not been tried with this project. Only Android emulators
can be used: iOS simulators need a Mac.

1. Install Java 17 or newer (Android Studio's bundled JDK works) and set `JAVA_HOME` to it.
2. Download [maestro.zip](https://github.com/mobile-dev-inc/maestro/releases/latest/download/maestro.zip)
   and extract it to a stable location, e.g. `C:\maestro`.
3. Add its `bin` folder to your user `PATH`, in PowerShell:

    ```powershell
    [Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\maestro\bin", "User")
    ```

4. Open a new terminal and check with `maestro --help`.

To opt out of usage analytics, set the user environment variable `MAESTRO_CLI_NO_ANALYTICS` to `1`.
```

=== "Linux (untested)"

```
Not tried with this project. Android emulators only. With Java 17+ installed and `JAVA_HOME` set:

```sh
curl -fsSL "https://get.maestro.mobile.dev" | bash
```

This installs to `~/.maestro/bin`; add that to your `PATH`. To opt out of usage analytics, add
`export MAESTRO_CLI_NO_ANALYTICS=1` to your shell profile.
```

You also need what native builds need:

- **iOS (macOS only):** Xcode and CocoaPods, as in
[Building and deploying to iOS](./building-and-deploying-to-ios.md).
- **Android:** the Android SDK and an emulator (from Android Studio's device manager), and JDK 21 for Gradle.
The build also expects the deployment's `google-services.json` in `android/app/` (download it from the
Firebase console). Without it, the build still succeeds but leaves out Firebase.

## Build the app

Maestro tests an installed app, so every change to the web code needs a full native rebuild. Use **debug
builds** (see [Known issues](#known-issues) for why this matters on Android).

!!! note "Debug builds vs the `debug` deployment"

```
A **debug build** is a type of native build, not a choice of content. Android has two build types:
*debug* (`assembleDebug`, an APK that can be installed directly and inspected with developer tools, like
the one the [on-device testing](./device-testing.md) workflow produces) and *release* (`bundleRelease`,
signed for the Play Store). iOS has matching *Debug* and *Release* configurations in Xcode.

The **`debug` deployment** is a set of content (app-debug-content) used to try out components and
features. Any deployment can be built as a debug or a release build, and the `debug` deployment can be
built either way too.
```

```sh
yarn workflow deployment set <name>
yarn workflow android configure && yarn workflow ios configure   # after switching deployment
yarn build
npx cap sync
```

=== "Android"

```
```sh
cd android && JAVA_HOME=$(/usr/libexec/java_home -v 21) ./gradlew :app:assembleDebug && cd ..
adb -s emulator-5554 install -r android/app/build/outputs/apk/debug/app-debug.apk
```

You can also build the debug APK from Android Studio's Build menu.
```

=== "iOS simulator"

```
```sh
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -destination 'generic/platform=iOS Simulator' -derivedDataPath /tmp/oab-ios \
  CODE_SIGNING_ALLOWED=NO build
xcrun simctl install <simulator-udid> "/tmp/oab-ios/Build/Products/Debug-iphonesimulator/<App name>.app"
```

No signing is needed for a simulator build. `maestro list-devices` shows the udid.
```

## Run flows

Flows depend on a deployment's content (the text on its buttons, its launch pop-ups), so they live in the
**deployment's repo**, in a `.maestro/` folder. For example, the `debug` deployment
([app-debug-content](https://github.com/IDEMSInternational/app-debug-content)) has a smoke flow,
`.maestro/smoke.yaml`: it launches the app fresh, uses the launch pop-up, closes it and opens the Templates
page, taking a screenshot at each stage.

From the open-app-builder root:

```sh
# Android
maestro --device emulator-5554 test .idems_app/deployments/debug/.maestro/smoke.yaml

# iOS: the app id differs between platforms, so pass it in
maestro --device <simulator-udid> test -e APP_ID=international.idems.debug-app \
  .idems_app/deployments/debug/.maestro/smoke.yaml
```

- `--device` is needed whenever more than one simulator or emulator is running; `maestro list-devices`
shows their ids.
- Screenshots go to `~/.maestro/tests/<timestamp>/<flow>/takeScreenshot/`, or to the folder given by
`--test-output-dir`.
- The app ids are `android.app_id` and `ios.app_id` in the deployment's `config.ts`. Flows default to the
Android one: `appId: ${APP_ID || "<android app id>"}`. Avoid an `env:` block for this default, as it
overrides values passed in through the MCP server.

To write a flow, see Maestro's [commands reference](https://docs.maestro.dev/reference/commands-available).
Target elements by their visible text (`tapOn: "Templates"`); the text must match in full. The MCP server's
`inspect_screen` tool (below) is a good way to find the exact text.

## Use it from an AI assistant (MCP)

Maestro's MCP server comes with the CLI. Register it once with your assistant, for example in Claude Code:

```sh
claude mcp add --scope user maestro -- maestro mcp
```

Other MCP clients use the same command (`maestro mcp`). The assistant then has these tools:

| Tool | What it does |
|---|---|
| `list_devices` | Lists local simulators and emulators (and their ids) |
| `inspect_screen` | Returns the elements on screen, with their text and positions |
| `take_screenshot` | Takes a screenshot of the current screen |
| `run` | Runs Maestro commands (inline YAML) or flow files |
| `cheat_sheet` | Maestro command reference |

The repo's assistant skill (`.claude/skills/maestro/SKILL.md`) covers the build steps and the issues below,
so an assistant can build, install and drive the app on request.

!!! note "Don't mix the CLI and the MCP server on one device"

```
Running the `maestro` CLI on a device replaces the driver the MCP server installed there. After that,
every MCP call on that device fails ("Device server died", or "Device became unreachable") until the MCP
server is reconnected in your assistant.
```

When the MCP server runs a flow, any `takeScreenshot` files are saved in the server's working directory,
usually the repo root. Delete them rather than committing them.

## Known issues

Verified with Maestro 2.12.1 in November 2026.

**Android: taps on a pop-up opened during app launch miss.** If the Android WebView builds its accessibility
information while Ionic's pop-up animation is running (pop-ups slide up from 40px below), it keeps those
positions after the animation ends. Maestro then sees the pop-up's buttons about 40 CSS pixels below where
they are drawn, and taps land below them. Waiting does not help. Page navigation and pop-ups opened later
by a tap were not affected.

The app works around this in **debug builds on Android only**: after a pop-up opens, it briefly changes the
pop-up's layout, which makes the WebView recompute positions (`refreshAndroidModalAccessibilityBounds` in
`src/app/app.component.ts`). Release builds don't include it, so run Maestro against debug builds.

**iOS: content is visible behind the splash screen.** Maestro sees the app's content while the native splash
screen is still covering it, so a flow can find text and then tap the splash. After `launchApp`, wait for
the splash to go:

```yaml
- extendedWaitUntil:
    notVisible:
      id: "Splash"
    timeout: 30000
```

**iOS simulator: "Apple Account Verification" alert.** The simulator may show this system alert over the
app. Dismiss it with an optional tap:

```yaml
- tapOn:
    text: "Not Now"
    optional: true
```

`maestro hierarchy` **doesn't show web content on Android.** The standalone command only shows the native
views. Flows and the MCP server's `inspect_screen` do see the web content.
