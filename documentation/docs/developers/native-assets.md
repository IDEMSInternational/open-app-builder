# Native Assets (Android & iOS)

Generate app icon and splash/launch screen assets for Android and iOS from a single logo image and background colour. The same approach is used on both platforms for consistency.

See Google's docs for [adaptive icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive) and [splash screens](https://developer.android.com/guide/topics/ui/splash-screen), and Apple's [launch screen](https://developer.apple.com/documentation/xcode/specifying-your-apps-launch-screen) guidance.

## Canonical approach: logo + background colour

Provide one logo image and one background colour (any CSS color, e.g. hex, named colours like "yellow", rgb). The logo is centred on the background to generate:

- **Android:** App icon (adaptive) and splash assets. On Android 12+ the system shows a splash derived from the icon and background colour; generated splash files are used on older devices and match the same look (logo on background).
- **iOS:** App icon and launch screen (logo on background). Apple expects the launch screen to be simple and to resemble the first screen.

### Source image

| Asset   | Filename (convention) | Minimum size  | Required |
|--------|------------------------|---------------|----------|
| Logo   | `logo.png`             | 1024×1024px  | Yes      |

PNG or SVG. The logo should work on a solid background (transparent or non‑transparent areas are both fine).

### Configuration

Set `logo_asset_path` and optionally `logo_background_color` in your deployment config. You can set the same values under both `android` and `ios` for consistency, or set only one and the iOS workflow can fall back to the Android config.

If `logo_background_color` is omitted, a default white (`#ffffff`).

```ts title=".idems_app/deployments/plh/global.config.ts"
const config: IDeploymentConfig = {
  ...
  android: {
    logo_asset_path: "./app-data/assets/global/android/logo.png",
    logo_background_color: "#3498db",
  },
  ios: {
    logo_asset_path: "./app-data/assets/global/android/logo.png",
    logo_background_color: "#3498db",
  },
  ...
};
```

## Deprecated: legacy asset-based config

The following properties are **deprecated** but still supported for existing deployments. They use a separate icon image and splash image (asset-based path), not the logo approach above.

| Property                      | Description                                      |
|------------------------------|--------------------------------------------------|
| `splash_asset_path`          | Path to full splash image (legacy).              |
| `icon_asset_path`           | Path to full icon image (legacy).                |
| `icon_asset_foreground_path`| Optional adaptive icon foreground (legacy).     |
| `icon_asset_background_path` | Optional adaptive icon background (legacy).      |

If you use these, the workflow still runs the legacy path: separate icon and splash assets are generated. Prefer migrating to `logo_asset_path` and `logo_background_color` for new or updated deployments.

## Running the workflow

### Locally

**Android:** Configure platform files and generate assets:

```sh
yarn workflow android
```

To run only asset generation:

```sh
yarn workflow android generate_assets
```

**iOS:** Configure and generate assets:

```sh
yarn workflow ios
```

To run only asset generation:

```sh
yarn workflow ios generate_assets
```

## Generated files

Generated assets are written into the native project folders (`android/`, `ios/App/`). The exact files depend on the platform; see the Android and iOS project structure for app icon and splash/launch screen assets.

| Android | iOS |
|---------|-----|
| App icon (adaptive + legacy), splash screen assets | App icon, launch screen assets |

## Future customisation

Dark mode is not currently supported (e.g. separate logo or background colour for dark theme).
