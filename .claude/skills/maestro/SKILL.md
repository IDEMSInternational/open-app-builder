---
name: maestro
description: Build the app for an iOS simulator or Android emulator, then launch, tap through and screenshot it with Maestro (CLI or its MCP server). Use when asked to run the app natively, check something on a simulator/emulator, or run a deployment's Maestro flows (`<deployment>/.maestro/`).
---

# Driving the native app with Maestro

[Maestro](https://maestro.dev) launches the app on a local iOS simulator or Android emulator, taps by visible
text and takes screenshots. Its MCP server (`maestro mcp`) exposes the same as tools: `list_devices`,
`inspect_screen`, `take_screenshot`, `run` (inline YAML or flow files) and `cheat_sheet`. Developer docs:
`documentation/docs/developers/maestro.md` (keep the two in step). Background and pilot results: issue #3761.

Flows depend on a deployment's content, so they live in that deployment's repo, in
`.idems_app/deployments/<name>/.maestro/` (e.g. `smoke.yaml` in the `debug` deployment, app-debug-content).
Run them against an app built with that deployment active. List a deployment's flows with
`ls .idems_app/deployments/<name>/.maestro/`; the header of each flow says what it covers.

## One-off setup (per developer)

```bash
brew tap mobile-dev-inc/tap && brew install mobile-dev-inc/tap/maestro   # also installs Java (openjdk)
export MAESTRO_CLI_NO_ANALYTICS=1                                        # opt out of usage analytics
```

Register the MCP server with your client (per user, not committed), e.g. for Claude Code:
`claude mcp add --scope user maestro -- maestro mcp`. Local use needs no Maestro account.
Native builds also need Node ≥22, Xcode, the Android SDK, and JDK 21 for Gradle.

## Build and install

Every web change needs all three steps: web build, `cap sync`, native build.

```bash
yarn workflow deployment set <name>           # the deployment whose flows you will run
yarn workflow android configure && yarn workflow ios configure   # after switching deployment
yarn build
LANG=en_US.UTF-8 npx cap sync                 # pod install fails in a non-UTF-8 shell

# Android: debug APK (see "Android" below for why debug)
cd android && JAVA_HOME=$(/usr/libexec/java_home -v 21) ./gradlew :app:assembleDebug && cd ..
adb -s emulator-5554 install -r android/app/build/outputs/apk/debug/app-debug.apk

# iOS simulator (no signing needed)
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -destination 'generic/platform=iOS Simulator' -derivedDataPath /tmp/oab-ios CODE_SIGNING_ALLOWED=NO build
xcrun simctl install <simulator-udid> "/tmp/oab-ios/Build/Products/Debug-iphonesimulator/<App name>.app"
```

Android needs `android/app/google-services.json` for the deployment's app id (gitignored, downloaded from the
Firebase console); without it the build still succeeds but skips the Firebase plugins. Boot devices first
(Android Studio device manager or `emulator -avd <name>`; Simulator.app or `xcrun simctl boot <udid>`).

## Run

- **App id differs by platform**: `android.app_id` and `ios.app_id` in the deployment `config.ts` (debug:
  `international.idems.debug_app` vs `international.idems.debug-app`). Flows default to the Android id; pass
  `APP_ID` for iOS.
- **CLI:** `maestro --device <udid|emulator-5554> test [-e APP_ID=…] --test-output-dir <dir> <flow.yaml>`.
  Pass `--device` whenever more than one device is running. Without `--test-output-dir`, screenshots go to
  `~/.maestro/tests/<timestamp>/<flow>/takeScreenshot/`.
- **MCP:** `list_devices` for the id, then `run` with `files: ["<absolute path to flow.yaml>"]` and
  `env: {APP_ID: …}` for iOS, or with inline `yaml` for exploration. `inspect_screen` before writing
  selectors: copy `txt` values exactly; Maestro's `text:` matches the whole string as a regex. A flow's
  `takeScreenshot` files land in the MCP server's working directory (usually the repo root): move or delete
  them, don't commit them. Use `take_screenshot` to just look at the screen.
- **Flow defaults:** an `env:` block in a flow overrides values passed in through the MCP, so default
  `APP_ID` inline instead: `appId: ${APP_ID || "<android app id>"}`.
- **Don't use the CLI and the MCP on the same device in one session.** The CLI replaces the on-device driver,
  and every later MCP call on that device fails ("Device server died … UNAVAILABLE" on Android, "Device
  became unreachable during setPermissions" on iOS) until the MCP server is reconnected.

## Platform gotchas (verified 2026-11-12, Maestro 2.12.1)

### iOS

- Web view content is fully visible to Maestro and taps by text work.
- **Web view content is visible behind the native splash screen**, so `extendedWaitUntil: visible` passes
  while the splash still covers the app and the next tap hits the splash. Wait for
  `notVisible: {id: "Splash"}` after launch (as the debug deployment's `smoke.yaml` does).
- The simulator may show an "Apple Account Verification" system alert over the app; dismiss it with an
  optional `tapOn: "Not Now"`.

### Android

- Web view content is visible (via the accessibility tree) and taps by text work, with one exception below.
- **A pop-up opened during app launch reports its elements ~40 CSS px (≈105 device px on a 420 dpi
  emulator) below where they are drawn, so taps on them miss.** If the WebView's accessibility tree is
  built while Ionic's modal enter animation is running (it slides from `translateY(40px)`), Chromium keeps
  those positions until a layout change; `waitForAnimationToEnd` and `androidWebViewHierarchy: devtools` do
  not help. Seen on API 35 and 37; page navigation and pop-ups opened later by a tap were correct. The app
  works around it in **debuggable builds only** (`refreshAndroidModalAccessibilityBounds` in
  `src/app/app.component.ts`, gated on `Capacitor.DEBUG`), so run Maestro against debug APKs, not release
  builds. To check positions, compare `inspect_screen` bounds with a screenshot.
- Standalone `maestro hierarchy` does not show web view content; `inspect_screen` and flows do.
